import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import connectDb from "./config/configDb.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cookieParser()); // Parse cookies

// CORS setup (modify origins as per your frontend)
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

// Connect to Database
connectDb();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/hotels", hotelRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: err.message || "Internal  Error",
    errorDetails: process.env.NODE_ENV === "development" ? err : {},
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
