import mongoose from "mongoose"; // Import mongoose for MongoDB connection

// Define the schema for the orders
const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // User ID, required
  items: { type: Array, required: true }, // Array of items, required
  amount: { type: Number, required: true }, // Total amount, required
  address: { type: Object, required: true }, // Address object, required
  status: { type: String, default: "Food Processing" }, // Order status, default is "Food Processing"
  date: { type: Date, default: Date.now() }, // Order date, default is current date
  payment: { type: Boolean, default: false }, // Payment status, default is false
  paymentRefrence: { type: String,}
});

// Create the order model if it doesn't already exist
const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel; // Export the order model
