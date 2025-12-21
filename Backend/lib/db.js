// Importing the mongoose library for MongoDB interaction
import mongoose from "mongoose";

// Importing environment variables from the env.js file
import { ENV } from "./env.js";

// Function to establish a connection to the MongoDB database
export const connectDB = async () => {
  try {
    // Check if the database URL is defined in the environment variables
    if (!ENV.DB_URL) {
      throw new Error("DB_URL is not defined in environment variables");
    }

    // Attempt to connect to the MongoDB database using the provided URL
    const conn = await mongoose.connect(ENV.DB_URL);

    // Log a success message with the host of the connected database
    console.log("✅ Connected to MongoDB:", conn.connection.host);
  } catch (error) {
    // Log an error message if the connection fails
    console.error("❌ Error connecting to MongoDB", error);

    // Exit the process with a failure code (1)
    process.exit(1);
  }
};