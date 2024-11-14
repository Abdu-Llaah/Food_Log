import express from "express"; // Import express for creating the router
import { addFood, listFood, removeFood } from "../controllers/foodContoller.js"; // Import the controller functions
import multer from "multer"; // Import multer for handling file uploads

const foodRouter = express.Router(); // Create a new router

// Image Storage Engine
const storage = multer.diskStorage({ // Disk storage configuration
  destination: "uploads", // Destination folder for uploaded files
  filename: (req, file, cb) => { // Generate a unique filename for each file
    return cb(null, `${Date.now()}${file.originalname}`);
  }
});

const upload = multer({ storage: storage }); // Configure multer to use the storage engine

// Define the routes for food operations
foodRouter.post("/add", upload.single("image"), addFood); // Route to add a food item with image upload
foodRouter.get("/list", listFood); // Route to list all food items
foodRouter.post("/remove", removeFood); // Route to remove a food item

export default foodRouter; // Export the router
