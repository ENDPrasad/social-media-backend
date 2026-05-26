const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must atleast 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
      match: [/^[a-zA-Z\s'-]+$/, "First name can only contain letters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be atleast 8 characters"],
      select: false,
    },

  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", UserSchema);
