import express from "express";
import Dish from "../models/dish.model.js";

const router = express.Router();

// Create a new dish
router.post("/", async (req, res) => {
    try {
        const { name, description, price, image, quantity, chef } = req.body;

        // Create a new dish instance
        const newDish = new Dish({
            name,
            description,
            price,
            image,
            quantity,
            chef,
        });

        await newDish.save();
        res.status(201).json(newDish);
    } catch (error) {
        res.status(400).json({ message: "Error creating dish", error });
    }
});
// Get all dishes
router.get("/", async (req, res) => {
    try {
        const dishes = await Dish.find().populate("chef", "name"); // Populate chef's name
        res.status(200).json(dishes);
    } catch (error) {
        res.status(400).json({ message: "Error fetching dishes", error });
    }
});

