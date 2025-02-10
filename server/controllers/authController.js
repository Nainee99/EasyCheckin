import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { validationResult } from "express-validator";
import { createError, createSuccess } from "../utils/responseHandler.js";

dotenv.config();

// Register a new user
export const register = async (req, res, next) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return next(createError(400, "Email is already in use"));

    // Create new user
    const newUser = new User({
      username,
      email,
      password, // Pre-save middleware in schema will hash this
    });

    await newUser.save();
    res.status(201).json(createSuccess("User registered successfully."));
  } catch (err) {
    console.log(err);
    next(createError(500, "Internal Server Error", err));
  }
};

// Login user
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return next(createError(404, "User not found"));

    // Compare passwords
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return next(createError(400, "Invalid credentials"));

    // Generate access & refresh tokens
    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );
    console.log(accessToken);

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    // Store refresh token securely
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    const { password: _, ...otherDetails } = user._doc;

    res.status(200).json(
      createSuccess("Login successful", {
        accessToken,
        user: { ...otherDetails },
      })
    );
  } catch (err) {
    next(createError(500, "Internal Server Error", err));
  }
};

// Refresh token endpoint
export const refreshToken = async (req, res, next) => {
  try {
    const token = req.cookies.refresh_token;
    if (!token) return next(createError(401, "No refresh token found"));

    jwt.verify(token, process.env.REFRESH_SECRET, (err, user) => {
      if (err) return next(createError(403, "Invalid refresh token"));

      const newAccessToken = jwt.sign(
        { id: user.id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
      );

      res
        .status(200)
        .json(
          createSuccess("Token refreshed", { accessToken: newAccessToken })
        );
    });
  } catch (err) {
    next(createError(500, "Internal Server Error", err));
  }
};

// Logout user
export const logout = (req, res) => {
  res.clearCookie("refresh_token");
  res.status(200).json(createSuccess("Logged out successfully"));
};
