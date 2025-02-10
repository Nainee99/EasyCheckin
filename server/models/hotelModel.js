import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true, // Ensure unique hotel names
    },
    type: {
      type: String,
      required: true,
      enum: ["hotel", "apartment", "resort", "villa", "cabin"],
    },
    city: {
      type: String,
      required: true,
      index: true, // Faster search by city
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    distance: {
      type: Number,
      required: true,
      min: 0, // Ensure a valid distance
    },
    photos: {
      type: [String],
      validate: [(arr) => arr.length <= 10, "Max 10 photos allowed"], // Limit photos
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    desc: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 3.5, // Default rating
    },
    rooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room", // Proper reference to Room Model
      },
    ],
    cheapestPrice: {
      type: Number,
      required: true,
      min: 1, // Ensure valid pricing
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Indexes for optimized search
HotelSchema.index({ city: 1, type: 1 });
HotelSchema.index({ rating: -1 }); // Add an index for sorting by rating

// Optionally, you could add virtuals for things like average ratings or number of rooms
// HotelSchema.virtual('averageRating').get(function () {
//   return this.rating.reduce((a, b) => a + b, 0) / this.rating.length;
// });

export default mongoose.model("Hotel", HotelSchema);
