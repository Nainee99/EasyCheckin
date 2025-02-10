import jwt from "jsonwebtoken";
import { createError } from "../utils/responseHandler.js";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies?.access_token; // ✅ Extract token from cookies
    if (!token) {
      return next(createError(401, "Authentication token is missing!"));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return next(createError(403, "Invalid or expired token!"));
      req.user = user;
      next();
    });
  } catch (error) {
    console.log(error);
    next(createError(500, "Internal Server Error"));
  }
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, (err) => {
    if (err) return next(err);
    if (req.user?.id === req.params.id || req.user?.isAdmin) {
      return next();
    }
    return next(createError(403, "Access denied!"));
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, (err) => {
    if (err) return next(err);
    if (req.user?.isAdmin) {
      return next();
    }
    return next(createError(403, "Admin access required!"));
  });
};
