import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Modify uploadImage to accept URLs as well
export const uploadImage = async (imageFile) => {
  try {
    let result;
    // Check if it's a URL or a local file
    if (imageFile.startsWith('http')) {
      result = await cloudinary.v2.uploader.upload(imageFile, {
        folder: "homeMade/chef-profiles", 
        use_filename: true,
        unique_filename: false,
      });
    } else {
      result = await cloudinary.v2.uploader.upload(imageFile, {
        folder: "homeMade/chef-profiles", 
        use_filename: true,
        unique_filename: false,
      });
    }
    return result.secure_url;
  } catch (error) {
    throw new Error("Error uploading image to Cloudinary: " + error.message);
  }
};




// Delete image function with fallback and checks for publicId
export const deleteImageFromCloudinary = async (imageUrl) => {
  try {
    // Validate the imageUrl
    if (!imageUrl || typeof imageUrl !== "string") {
      throw new Error("Invalid image URL provided.");
    }

    // Extract public ID from the URL
    const parts = imageUrl.split("/");
    if (parts.length < 2) {
      throw new Error("Malformed image URL.");
    }

    // Fallback logic to ensure publicId extraction is accurate
    const lastPart = parts.pop(); // Get the last part of the URL
    const publicId = lastPart.split(".")[0]; // Extract the ID before the file extension
    if (!publicId) {
      throw new Error("Unable to extract public ID from image URL.");
    }

    // Construct the full public ID path
    const folderPath = "homeMade/chef-profiles/";
    const fullPublicId = `${folderPath}${publicId}`;

    // Perform the deletion
    const result = await cloudinary.v2.uploader.destroy(fullPublicId);
    return result; // Return the result of the deletion
  } catch (error) {
    throw new Error("Error deleting image from Cloudinary: " + error.message);
  }
};
