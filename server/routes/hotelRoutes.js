import express from "express";
import {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getHotels,
  countByCity,
  countByType,
  getHotelRooms,
} from "../controllers/hotelController.js";
import { verifyAdmin } from "../middlewares/verifyToken.js";
import { check } from "express-validator";
import rateLimit from "express-rate-limit";

const router = express.Router();

// Rate limiter for write operations
const hotelLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per window
  message: "Too many requests, please try again later.",
});

// CREATE Hotel (Only Admin)
router.post(
  "/",
  verifyAdmin,
  hotelLimiter,
  [
    check("name", "Name is required").notEmpty(),
    check("type", "Type must be valid").isIn([
      "hotel",
      "apartment",
      "resort",
      "villa",
      "cabin",
    ]),
    check("city", "City is required").notEmpty(),
    check("address", "Address is required").notEmpty(),
    check("distance", "Distance must be a positive number").isFloat({ min: 0 }),
    check("cheapestPrice", "Price must be a positive number").isFloat({
      min: 1,
    }),
  ],
  createHotel
);

// UPDATE Hotel (Only Admin)
router.put("/:id", verifyAdmin, hotelLimiter, updateHotel);

// DELETE Hotel (Only Admin)
router.delete("/:id", verifyAdmin, hotelLimiter, deleteHotel);

// GET Single Hotel
router.get("/:id", getHotel);

// GET All Hotels with filters
router.get("/", getHotels);

// COUNT Hotels by City
router.get("/countByCity", countByCity);

// COUNT Hotels by Type
router.get("/countByType", countByType);

// GET Rooms of a Hotel
router.get("/:id/rooms", getHotelRooms);

export default router;
