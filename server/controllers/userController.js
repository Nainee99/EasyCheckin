import User from "../models/userModel.js";
import { createError, createSuccess } from "../utils/responseHandler.js";

export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true } // Ensure validation
    ).select("-password"); // Exclude password from response

    if (!updatedUser) return next(createError(404, "User not found!"));

    res
      .status(200)
      .json(createSuccess("User updated successfully", updatedUser));
  } catch (err) {
    next(createError(500, "Internal Server Error", err));
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(createError(404, "User not found!"));

    await user.deleteOne();
    res.status(200).json(createSuccess("User has been deleted."));
  } catch (err) {
    next(createError(500, "Internal Server Error", err));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return next(createError(404, "User not found!"));

    res.status(200).json(createSuccess("User fetched successfully", user));
  } catch (err) {
    next(createError(500, "Internal Server Error", err));
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(createSuccess("Users fetched successfully", users));
  } catch (err) {
    next(createError(500, "Internal Server Error", err));
  }
};
