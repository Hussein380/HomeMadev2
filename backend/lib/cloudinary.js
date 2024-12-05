import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload image function
export const uploadImage = async (imageFile) => {
  try {
    const result = await cloudinary.v2.uploader.upload(imageFile, {
      folder: "homeMade/chef-profiles", // specify the folder for your images
      use_filename: true, // use the original filename
      unique_filename: false, // ensure filenames are not auto-generated
    });
    return result.secure_url; // Return the URL of the uploaded image
  } catch (error) {
    throw new Error("Error uploading image to Cloudinary: " + error.message);
  }
};
