import express from "express";


import {
  createChefProfile,
  getChefProfile,
  updateChefProfile,
  deleteChefProfile,
  getChefStats,
} from "../controllers/chef.controller.js";
import { protectRoute, roleBasedAccess } from "../middlewares/auth.middleware.js";
import {
  uploadProfilePicture,
  uploadCertificates,
} from "../middlewares/ChefUpload.middleware.js";

const router = express.Router();

// Create chef profile
router.post(
  "/create",
  protectRoute,
  roleBasedAccess("chef"),
  uploadProfilePicture,
  uploadCertificates,
  createChefProfile
);

// Get chef profile
router.get("/profile", protectRoute, roleBasedAccess("chef"), getChefProfile);

// Update chef profile
router.put(
  "/profile",
  protectRoute,
  roleBasedAccess("chef"),
  uploadProfilePicture,
  uploadCertificates,
  updateChefProfile
);

// Delete chef profile
router.delete("/profile", protectRoute, roleBasedAccess("chef"), deleteChefProfile);

// Get chef stats
router.get("/me", protectRoute, roleBasedAccess("chef"), getChefStats);



export default router;
