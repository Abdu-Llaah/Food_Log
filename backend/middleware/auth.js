import jwt from "jsonwebtoken"; // Import JSON Web Token for authentication

// Define the authentication middleware
const authMiddleware = async (req, res, next) => {
  const { token } = req.headers; // Extract the token from the request headers
  if (!token) {
    return res.json({ success: false, message: "Not Authorized. Login Again" }); // Send response if token is missing
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    req.body.userId = token_decode.id; // Attach the user ID to the request body
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.log(error); // Log the error
    res.json({ success: false, message: "Error" }); // Send error response
  }
};

export default authMiddleware; // Export the middleware
