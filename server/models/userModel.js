import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    country: {
      type: String,
      required: false,
    },
    img: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
      match: [/^\+?\d{10,15}$/, "Please provide a valid phone number"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(12); // Increased salt rounds for security
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default mongoose.model("User", UserSchema);
