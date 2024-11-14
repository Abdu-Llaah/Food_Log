import mongoose from "mongoose"; // Import mongoose for MongoDB connection

// Function to connect to the MongoDB database
export const connectDB = async () => {
  await mongoose.connect('mongodb+srv://abdullaahjumah7:Alhamdulillaah@cluster0.3gn5m.mongodb.net/food-del')
    .then(() => console.log("DB Connected")) // Log a message when the connection is successful
    .catch((error) => console.error("DB Connection Error:", error)); // Log an error message if the connection fails
};
