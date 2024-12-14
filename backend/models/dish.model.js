import mongoose from "mongoose";

const dishSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String }, // New field for image URL or path
    dateUpdated: { type: Date, default: Date.now }, // New field for last updated date
    likes: { type: Number, default: 0 }, // New field for likes
    quantity: { type: Number, required: true, default: 1 }, // New field for quantity
    chef: { type: mongoose.Schema.Types.ObjectId, ref: "Chef", required: true },
    createdAt: { type: Date, default: Date.now }
});

// Create and export the Dish model
const Dish = mongoose.model("Dish", dishSchema);

export default Dish;
