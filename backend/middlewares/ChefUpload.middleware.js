import { uploadImage } from "../lib/cloudinary.js";

export const uploadProfilePicture = async (req, res, next) => {
  if (!req.file) return next();

  try {
    // Check if it's an external URL or a local file
    const imagePath = req.file.path || req.file.url;
    const result = await uploadImage(imagePath); // Use path or URL

    req.body.profilePicture = result; // Cloudinary URL
    next();
  } catch (err) {
    console.error("Error uploading profile picture:", err);
    return res.status(500).json({ message: "Error uploading profile picture." });
  }
};

export const uploadCertificates = async (req, res, next) => {
  if (!req.files || !Array.isArray(req.files)) return next();

  try {
    // Handle multiple files (check if local file path or external URL)
    const certificateUrls = await Promise.all(
      req.files.map(async (file) => {
        const imagePath = file.path || file.url; // Check for path or URL
        const result = await uploadImage(imagePath);
        return result; // Cloudinary URL for each certificate
      })
    );
    req.body.certificates = certificateUrls;
    next();
  } catch (err) {
    console.error("Error uploading certificates:", err);
    return res.status(500).json({ message: "Error uploading certificates." });
  }
};
