import mongoose from "mongoose";
import { ENV } from "./env.js";

// Flag to track if the database connection is already established
let isConnected = false;

// Function to connect to the MongoDB database
export const connectDB = async () => {
  // If already connected, return early
  if (isConnected) return;

  // Ensure the database URL is defined in environment variables
  if (!ENV.DB_URL) {
    throw new Error("DB_URL is not defined in environment variables");
  }

  try {
    // Attempt to connect to the MongoDB database
    await mongoose.connect(ENV.DB_URL);
    isConnected = true; // Set the connection flag to true
    console.log("🟢 MongoDB Connected");
  } catch (err) {
    // Log and rethrow any connection errors
    console.error("❌ MongoDB connection error:", err.message);
    throw err;
  }
};