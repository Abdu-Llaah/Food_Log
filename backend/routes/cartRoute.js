import express from "express"; // Import express for creating the router
import { addToCart, removeFromCart, getCart } from "../controllers/cartController.js"; // Import the controller functions
import authMiddleware from "../middleware/auth.js"; // Import the authentication middleware

const cartRouter = express.Router(); // Create a new router

// Define the routes for the cart operations with authentication middleware
cartRouter.post("/add", authMiddleware, addToCart); // Route to add items to the cart
cartRouter.post("/remove", authMiddleware, removeFromCart); // Route to remove items from the cart
cartRouter.post("/get", authMiddleware, getCart); // Route to get the cart data

export default cartRouter; // Export the router
