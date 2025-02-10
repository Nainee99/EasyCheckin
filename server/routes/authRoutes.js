import express from "express";
import {
  login,
  register,
  refreshToken,
  logout,
} from "../controllers/authController.js";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/signup",
  [
    body("username").isLength({ min: 3 }).trim(),
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 6 }),
  ],
  register
);

router.post("/login", login);
router.post("/refresh", refreshToken);
router.post("/logout", logout);

export default router;
