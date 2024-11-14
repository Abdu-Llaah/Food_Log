import userModel from "../models/userModel.js"; // Import the user model
import jwt from "jsonwebtoken"; // Import JSON Web Token for authentication
import bcrypt from "bcrypt"; // Import bcrypt for password hashing
import validator from "validator"; // Import validator for email validation

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email }); // Find the user by email

    if (!user) {
      return res.json({ success: false, message: "User Doesn't exist" }); // User not found
    }

    const isMatch = await bcrypt.compare(password, user.password); // Compare the password

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" }); // Password does not match
    }

    const token = createToken(user._id); // Create a token for the user
    res.json({ success: true, token }); // Send success response with token

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" }); // Send error response
  }
};

// Function to create a token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET); // Sign the token with the user ID and secret key
};

// Register user
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    // Check if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" }); // User already exists
    }
    // Validate email format & strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" }); // Invalid email format
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter a strong password" }); // Password too short
    }
    // Hash the user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword
    });

    const user = await newUser.save(); // Save the new user
    const token = createToken(user._id); // Create a token for the user
    res.json({ success: true, token }); // Send success response with token
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" }); // Send error response
  }
};

export { loginUser, registerUser }; // Export the functions
