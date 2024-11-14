import mongoose from "mongoose"; // Import mongoose for MongoDB connection

// Define the schema for the food items
const foodSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the food item, required
  description: { type: String, required: true }, // Description of the food item, required
  price: { type: Number, required: true }, // Price of the food item, required
  image: { type: String, required: true }, // Image of the food item, required
  category: { type: String, required: true } // Category of the food item, required
});

// Create the food model if it doesn't already exist
const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

export default foodModel; // Export the food model
