import mongoose from "mongoose";

const dishSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Dish name is required"],
    },
    description: {
      type: String,
      required: [true, "Dish description is required"],
    },
    price: {
      type: Number,
      required: [true, "Dish price is required"],
    },
    image: {
      type: String, // URL or file path to image
    },
    chef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chef", // Reference to Chef model
      required: true,
    },
    category: {
      type: String,
      default: "General",
    },
    available: {
      type: Boolean,
      default: true,
    },
    likes: {
      type: Number,
      default: 0, // Initialize likes to 0
    },
  },
  {
    timestamps: true,
  }
);

const Dish = mongoose.model("Dish", dishSchema);

export default Dish;

