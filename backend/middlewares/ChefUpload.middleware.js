import cloudinary from "../lib/cloudinary.js";

export const uploadProfilePicture = async (req, res, next) => {
  if (!req.file) return next();

  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    req.body.profilePicture = result.secure_url; // Cloudinary URL
    next();
  } catch (err) {
    console.log("Error uploading image:", err);
    res.status(500).json({ message: "Error uploading image." });
  }
};

// Add additional middleware for certificate uploads if necessary
