import express from "express"; // Import express for creating the router
import authMiddleWare from "../middleware/auth.js"; // Import the authentication middleware
import { listOrders, placeOrder, updateStatus, userOrders, verifyOrder } from "../controllers/orderController.js"; // Import the controller functions

const orderRouter = express.Router(); // Create a new router

// Define the routes for order operations with authentication middleware where necessary
orderRouter.post("/place", authMiddleWare, placeOrder); // Route to place an order
//orderRouter.post("/place", placeOrder); // Route to place an order
orderRouter.post("/verify", verifyOrder); // Route to verify an order
orderRouter.post("/userorders", authMiddleWare, userOrders); // Route to get user orders
orderRouter.get("/list", listOrders); // Route to list all orders
orderRouter.post("/status", updateStatus); // Route to update order status

export default orderRouter; // Export the router
