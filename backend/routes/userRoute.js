import express from "express"; // Import express for creating the router
import { loginUser, registerUser } from "../controllers/userContoller.js"; // Import the controller functions

const userRouter = express.Router(); // Create a new router

// Define the routes for user operations
userRouter.post("/register", registerUser); // Route to register a new user
userRouter.post("/login", loginUser); // Route to login a user

export default userRouter; // Export the router
