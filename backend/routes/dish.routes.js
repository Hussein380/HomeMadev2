import express from "express";
import multer from "multer";
import Dish from "../models/dish.model.js";
import Joi from "joi";

const router = express.Router();

// Multer setup for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Save images to "uploads" folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
    },
});
const upload = multer({ storage });

// Validation schema using Joi
const dishValidationSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional(),
    price: Joi.number().required(),
    quantity: Joi.number().min(1).required(),
    chef: Joi.string().required(), // Chef ID (ObjectId)
});

// Create a new dish
router.post("/", upload.single("image"), async (req, res) => {
    try {
        // Validate request body
        const { error } = dishValidationSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        // Create the dish
        const { name, description, price, quantity, chef } = req.body;
        const newDish = new Dish({
            name,
            description,
            price,
            quantity,
            chef,
            image: req.file ? req.file.path : null, // Store the image path
        });

        await newDish.save();
        res.status(201).json(newDish);
    } catch (error) {
        res.status(400).json({ message: "Error creating dish", error });
    }
});

// Get all dishes with pagination
router.get("/", async (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10
    try {
        const dishes = await Dish.find()
            .populate("chef", "name")
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 }); // Sort by latest created

        const total = await Dish.countDocuments();
        res.status(200).json({ total, page, dishes });
    } catch (error) {
        res.status(400).json({ message: "Error fetching dishes", error });
    }
});

// Get a single dish by ID
router.get("/:id", async (req, res) => {
    try {
        const dish = await Dish.findById(req.params.id).populate("chef", "name");
        if (!dish) return res.status(404).json({ message: "Dish not found" });
        res.status(200).json(dish);
    } catch (error) {
        res.status(400).json({ message: "Error fetching dish", error });
    }
});

// Update a dish by ID
router.put("/:id", upload.single("image"), async (req, res) => {
    try {
        const { name, description, price, quantity } = req.body;

        // Update fields, including optional image update
        const updateData = {
            name,
            description,
            price,
            quantity,
            dateUpdated: Date.now(),
        };
        if (req.file) updateData.image = req.file.path;

        const updatedDish = await Dish.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updatedDish) return res.status(404).json({ message: "Dish not found" });

        res.status(200).json(updatedDish);
    } catch (error) {
        res.status(400).json({ message: "Error updating dish", error });
    }
});

// Delete a dish by ID
router.delete("/:id", async (req, res) => {
    try {
        const dish = await Dish.findByIdAndDelete(req.params.id);
        if (!dish) return res.status(404).json({ message: "Dish not found" });
        res.status(200).json({ message: "Dish deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: "Error deleting dish", error });
    }
});

// Like a dish
router.post("/:id/like", async (req, res) => {
    try {
        const dish = await Dish.findById(req.params.id);
        if (!dish) return res.status(404).json({ message: "Dish not found" });

        dish.likes += 1;
        await dish.save();
        res.status(200).json(dish);
    } catch (error) {
        res.status(400).json({ message: "Error liking dish", error });
    }
});

export default router;

