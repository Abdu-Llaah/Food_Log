import { log } from "console"; // Import the console log for debugging
import foodModel from "../models/foodModel.js"; // Import the food model
import fs from 'fs'; // Import the file system module

// Add food item
const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`; // Get the filename of the uploaded image

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename
  });

  try {
    await food.save(); // Save the food item
    res.json({ success: true, message: "Food Added" }); // Response if successful
  } catch (error) {
    console.log(error); // Log the error
    res.json({ success: false, message: "Error" }); // Response if failed
  }
};

// List all food items
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({}); // Find all food items
    res.json({ success: true, data: foods }); // Response with the list of food items
  } catch (error) {
    console.log(error); // Log the error
    res.json({ success: false, message: "Error" }); // Response if failed
  }
};

// Remove food item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id); // Find the food item by ID
    fs.unlink(`uploads/${food.image}`, () => {}); // Delete the image file

    await foodModel.findByIdAndDelete(req.body.id); // Delete the food item
    res.json({ success: true, message: "Food Removed" }); // Response if successful
  } catch (error) {
    console.log(error); // Log the error
    res.json({ success: false, message: "Error" }); // Response if failed
  }
};

export { addFood, listFood, removeFood }; // Export the functions
