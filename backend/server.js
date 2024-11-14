import express from "express"; // Import express for creating the server
import cors from "cors"; // Import cors for handling cross-origin requests
import { connectDB } from "./config/db.js"; // Import the function to connect to the database
import foodRouter from "./routes/foodRoute.js"; // Import the food router
import userRouter from "./routes/userRoute.js"; // Import the user router
import 'dotenv/config'; // Import dotenv for environment variables
import cartRouter from "./routes/cartRoute.js"; // Import the cart router
import orderRouter from "./routes/orderRoute.js"; // Import the order router

// App configuration
const app = express(); // Create an express application
const port = 4000; // Define the port number

// Middleware
app.use(express.json()); // Middleware to parse JSON bodies from incoming requests
app.use(cors()); // Middleware to enable CORS (Cross-Origin Resource Sharing)

// Database connection
connectDB(); // Connect to the database

// API endpoints
app.use("/api/food", foodRouter); // Use the food router for /api/food endpoints
app.use("/images", express.static('uploads')); // Serve static files from the uploads folder
app.use("/api/user", userRouter); // Use the user router for /api/user endpoints
app.use("/api/cart", cartRouter); // Use the cart router for /api/cart endpoints
app.use("/api/order", orderRouter); // Use the order router for /api/order endpoints

// Root endpoint
app.get("/", (req, res) => {
  res.send("API Working"); // Test API endpoint
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`); // Log the server start message
});


//mongodb+srv://abdullaahjumah7:Alhamdulillaah@cluster0.3gn5m.mongodb.net/?