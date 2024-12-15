import Dish from "../models/dishes.model.js";

// Create a new dish
export const createDish = async (req, res) => {
    try {
        const { name, description, price, chef, quantity } = req.body;
        const image = req.file ? req.file.path : ""; // Assuming you're using multer for image uploads

        const newDish = new Dish({
            name,
            description,
            price,
            image,
            quantity,
            chef
        });

        const savedDish = await newDish.save();
        res.status(201).json({ message: "Dish created successfully", dish: savedDish });
    } catch (err) {
        res.status(500).json({ message: "Error creating dish", error: err.message });
    }
};

// Get all dishes
export const getAllDishes = async (req, res) => {
    try {
        const dishes = await Dish.find().populate("chef", "name bio").exec();
        res.status(200).json(dishes);
    } catch (err) {
        res.status(500).json({ message: "Error fetching dishes", error: err.message });
    }
};

// Get dish by ID
export const getDishById = async (req, res) => {
    try {
        const dishId = req.params.id;
        const dish = await Dish.findById(dishId).populate("chef", "name bio").exec();
        if (!dish) return res.status(404).json({ message: "Dish not found" });

        res.status(200).json(dish);
    } catch (err) {
        res.status(500).json({ message: "Error fetching dish", error: err.message });
    }
};

// Update a dish
export const updateDish = async (req, res) => {
    try {
        const dishId = req.params.id;
        const updates = req.body;
        if (req.file) updates.image = req.file.path; // Update image if provided

        const updatedDish = await Dish.findByIdAndUpdate(dishId, updates, { new: true });
        if (!updatedDish) return res.status(404).json({ message: "Dish not found" });

        res.status(200).json({ message: "Dish updated successfully", dish: updatedDish });
    } catch (err) {
        res.status(500).json({ message: "Error updating dish", error: err.message });
    }
};

// Delete a dish
export const deleteDish = async (req, res) => {
    try {
        const dishId = req.params.id;
        const deletedDish = await Dish.findByIdAndDelete(dishId);
        if (!deletedDish) return res.status(404).json({ message: "Dish not found" });

        res.status(200).json({ message: "Dish deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting dish", error: err.message });
    }
};

// Increment likes for a dish
export const likeDish = async (req, res) => {
    try {
        const dishId = req.params.id;
        const updatedDish = await Dish.findByIdAndUpdate(
            dishId,
            { $inc: { likes: 1 } },
            { new: true }
        );
        if (!updatedDish) return res.status(404).json({ message: "Dish not found" });

        res.status(200).json({ message: "Dish liked", dish: updatedDish });
    } catch (err) {
        res.status(500).json({ message: "Error liking dish", error: err.message });
    }
};
