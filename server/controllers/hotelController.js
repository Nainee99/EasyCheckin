import Hotel from "../models/hotelModel.js";
import Room from "../models/roomModel.js";
import { createError, createSuccess } from "../utils/responseHandler.js";

// 🏨 CREATE Hotel
export const createHotel = async (req, res, next) => {
  try {
    const {
      name,
      type,
      city,
      address,
      distance,
      photos,
      title,
      desc,
      rating,
      rooms,
      cheapestPrice,
      featured,
    } = req.body;

    const newHotel = new Hotel({
      name,
      type,
      city,
      address,
      distance,
      photos,
      title,
      desc,
      rating,
      rooms,
      cheapestPrice,
      featured,
    });

    await newHotel.save();

    res.status(201).json(createSuccess("Hotel created successfully", newHotel));
  } catch (error) {
    console.error("❌ Error Creating Hotel:", error);
    next(createError(500, "Error creating hotel", error));
  }
};

// 🛠 UPDATE Hotel
export const updateHotel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    console.log(`📩 Updating Hotel (ID: ${id}) with Data:`, updateData);

    const updatedHotel = await Hotel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedHotel) {
      console.warn(`⚠️ Hotel Not Found (ID: ${id})`);
      return next(createError(404, "Hotel not found!"));
    }

    console.log("✅ Hotel Updated:", updatedHotel);
    res
      .status(200)
      .json(createSuccess("Hotel updated successfully", updatedHotel));
  } catch (error) {
    console.error("❌ Error Updating Hotel:", error);
    next(createError(500, "Error updating hotel", error));
  }
};

// ❌ DELETE Hotel
export const deleteHotel = async (req, res, next) => {
  try {
    const { id } = req.params;

    console.log(`🗑 Deleting Hotel (ID: ${id})`);

    const hotel = await Hotel.findById(id);
    if (!hotel) {
      console.warn(`⚠️ Hotel Not Found (ID: ${id})`);
      return next(createError(404, "Hotel not found!"));
    }

    await hotel.deleteOne();
    console.log(`✅ Hotel Deleted (ID: ${id})`);

    res.status(200).json(createSuccess("Hotel has been deleted."));
  } catch (error) {
    console.error("❌ Error Deleting Hotel:", error);
    next(createError(500, "Error deleting hotel", error));
  }
};

// 🔍 GET Single Hotel
export const getHotel = async (req, res, next) => {
  try {
    const { id } = req.params;

    console.log(`📩 Fetching Hotel (ID: ${id})`);

    const hotel = await Hotel.findById(id).select("-__v");
    if (!hotel) {
      console.warn(`⚠️ Hotel Not Found (ID: ${id})`);
      return next(createError(404, "Hotel not found!"));
    }

    console.log("✅ Hotel Fetched:", hotel);
    res.status(200).json(createSuccess("Hotel fetched successfully", hotel));
  } catch (error) {
    console.error("❌ Error Fetching Hotel:", error);
    next(createError(500, "Error fetching hotel", error));
  }
};

// 📋 GET All Hotels with Filters
export const getHotels = async (req, res, next) => {
  try {
    const { min = 1, max = 999, limit = 10, ...filters } = req.query;

    console.log(`📩 Fetching Hotels with Filters:`, {
      min,
      max,
      limit,
      filters,
    });

    const hotels = await Hotel.find({
      ...filters,
      cheapestPrice: { $gte: min, $lte: max },
    })
      .limit(Number(limit))
      .select("-__v");

    console.log("✅ Hotels Fetched:", hotels.length);
    res.status(200).json(createSuccess("Hotels fetched successfully", hotels));
  } catch (error) {
    console.error("❌ Error Fetching Hotels:", error);
    next(createError(500, "Error fetching hotels", error));
  }
};

// 🌍 COUNT Hotels by City
export const countByCity = async (req, res, next) => {
  try {
    const cities =
      req.query.cities?.split(",").map((city) => city.trim().toLowerCase()) ||
      [];

    console.log("Cities received:", cities); // Log the cities parameter

    const list = await Hotel.aggregate([
      { $match: { city: { $in: cities } } },
      {
        $group: {
          _id: "$city",
          count: { $sum: 1 },
        },
      },
    ]);

    console.log("✅ Hotel Count by City:", list);
    res.status(200).json(createSuccess("Hotel count by city fetched", list));
  } catch (error) {
    console.error("❌ Error Counting Hotels by City:", error);
    next(createError(500, "Error fetching hotel count by city", error));
  }
};

// 🏨 COUNT Hotels by Type
export const countByType = async (req, res, next) => {
  try {
    const counts = await Hotel.aggregate([
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 },
        },
      },
    ]);

    const formattedCounts = counts.map(({ _id, count }) => ({
      type: _id,
      count,
    }));

    console.log("✅ Hotel Count by Type:", formattedCounts);
    res
      .status(200)
      .json(createSuccess("Hotel count by type fetched", formattedCounts));
  } catch (error) {
    console.error("❌ Error Counting Hotels by Type:", error);
    next(createError(500, "Error fetching hotel count by type", error));
  }
};

// 🏨 GET Hotel Rooms
export const getHotelRooms = async (req, res, next) => {
  try {
    const { id } = req.params;

    console.log(`📩 Fetching Rooms for Hotel (ID: ${id})`);

    const hotel = await Hotel.findById(id).populate("rooms", "-__v");
    if (!hotel) {
      console.warn(`⚠️ Hotel Not Found (ID: ${id})`);
      return next(createError(404, "Hotel not found!"));
    }

    console.log("✅ Rooms Fetched:", hotel.rooms.length);
    res
      .status(200)
      .json(createSuccess("Rooms fetched successfully", hotel.rooms));
  } catch (error) {
    console.error("❌ Error Fetching Rooms:", error);
    next(createError(500, "Error fetching rooms", error));
  }
};
