import express from "express";
import { createChefProfile, getChefProfile, updateChefProfile, deleteChefProfile } from "../controllers/chef.controller.js";
import { protectRoute, roleBasedAccess } from "../middlewares/auth.middleware.js";
import { uploadProfilePicture } from "../middlewares/chefUpload.middleware.js";

const router = express.Router();

// Create chef profile
router.post("/create", protectRoute, roleBasedAccess("chef"), uploadProfilePicture, createChefProfile);

// Get chef profile
router.get("/profile", protectRoute, roleBasedAccess("chef"), getChefProfile);

// Update chef profile
router.put("/profile", protectRoute, roleBasedAccess("chef"), uploadProfilePicture, updateChefProfile);

// Delete chef profile
router.delete("/profile", protectRoute, roleBasedAccess("chef"), deleteChefProfile);

export default router;
