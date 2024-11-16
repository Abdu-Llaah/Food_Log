import mongoose from "mongoose"; // Import mongoose for MongoDB connection
//import { Unique } from "typeorm"; // Import Unique from typeorm (though it's not used in this code)

// Define the schema for the users
const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the user, required
  email: { type: String, required: true, unique: true }, // Email of the user, required and unique
  password: { type: String, required: true }, // Password of the user, required
  cartData: { type: Object, default: {} } // Cart data of the user, default is an empty object
}, { minimize: false });

// Create the user model if it doesn't already exist
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel; // Export the user model
