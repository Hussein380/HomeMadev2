import mongoose from "mongoose";

const chefSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  bio: String,
  specialties: [String],
  profilePicture: String,  // URL from Cloudinary
  certificates: [String],  // URLs from Cloudinary (if uploaded)
  location: {
    type: { type: String, default: "Point" }, // GeoJSON type for location
    coordinates: { type: [Number], required: true },
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Link to User model
    required: true,
  },
}, { timestamps: true });

const Chef = mongoose.model("Chef", chefSchema);

export default Chef;
