import userModel from "../models/userModel.js"; // Import the user model

// Add items to user cart
const addToCart = async (req, res) => {
  //console.log('object', req.body)
  try {
    let userData = await userModel.findById(req.body.userId); // Find the user by ID
    let cartData = userData.cartData; // Get the user's cart data
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1; // Add new item with quantity 1
    } else {
      cartData[req.body.itemId] += 1; // Increase quantity if item already exists
    }
    const updatedUser = await userModel.findByIdAndUpdate(req.body.userId, { cartData }); // Update the user's cart data
    
    console.log('userData', userData, 'updatedUser', updatedUser)
    res.json({ success: true, message: "Added to Cart" }); // Send success response
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" }); // Send error response
  }
};

// Remove items from user cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId); // Find the user by ID
    let cartData = userData.cartData; // Get the user's cart data
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1; // Decrease quantity if more than 0
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData }); // Update the user's cart data
    res.json({ success: true, message: "Removed From Cart" }); // Send success response
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" }); // Send error response
  }
};

// Fetch user cart data
const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId); // Find the user by ID
    let cartData = userData.cartData; // Get the user's cart data
    res.json({ success: true, cartData }); // Send success response with cart data
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" }); // Send error response
  }
};

export { addToCart, removeFromCart, getCart }; // Export the functions
