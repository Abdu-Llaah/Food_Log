import orderModel from "../models/orderModel.js"; // Import the order model
import userModel from "../models/userModel.js"; // Import the user model
import Paystack from "paystack"; // Import Paystack for payment processing

const paystack = new Paystack(process.env.Paystack_SECRET_KEY); // Initialize Paystack with the secret key

// Placing user order for frontend
const placeOrder = async (req, res) => {
  console.log(req.body)
  const frontend_url = "http://localhost:5174"; // URL for the frontend
  const { firstName, lastName, phoneNumber, country, city, state, street, email } = req.body.address
  if(!firstName || !lastName || !phoneNumber || !country || !city || !state || !street || !email ){
    return res.status(400).json({ success: false, data: 'Fill all fields in the address' })
  }
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save(); // Save the new order
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} }); // Clear the user's cart

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 80, // Convert price to smallest currency unit
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100 * 80, // Add delivery charges
      },
      quantity: 1,
    });

    const session = await paystack.transaction.initialize({
      amount: Number(req.body.amount * 100),
      email: email,
      callback_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      //cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    //newOrder.paymentRefrence= session.data.authorization_url

    console.log('object session', session.data.authorization_url)
    //res.json({ success: true, session_url: session.url }); // Send success response with session URL

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" }); // Send error response
  }
};

// Verify order payment
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true }); // Update order payment status
      res.json({ success: true, message: "Paid" }); // Send success response
    } else {
      await orderModel.findByIdAndDelete(orderId); // Delete the order if payment failed
      res.json({ success: false, message: "Not Paid" }); // Send failure response
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" }); // Send error response
  }
};

// Fetch user orders for frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId }); // Find orders by user ID
    res.json({ success: true, data: orders }); // Send success response with orders data
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" }); // Send error response
  }
};

// List orders for admin panel
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}); // Find all orders
    res.json({ success: true, data: orders }); // Send success response with orders data
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" }); // Send error response
  }
};

// API for updating order status
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status }); // Update order status
    res.json({ success: true, message: "Status Updated" }); // Send success response
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" }); // Send error response
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus }; // Export the functions
