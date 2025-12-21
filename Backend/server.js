// Import necessary modules and dependencies
import express from "express";
import { ENV } from "./lib/env.js"; // Environment variables
import { connectDB } from "./lib/db.js"; // Database connection
import cors from "cors"; // Cross-Origin Resource Sharing middleware
import { serve } from "inngest/express"; // Inngest middleware for serverless functions
import { clerkMiddleware } from "@clerk/express"; // Clerk middleware for authentication
import { inngest, functions } from "./lib/inngest.js"; // Inngest client and functions
import chatRoutes from "./routes/chatRoutes.js"; // Chat-related routes
import sessionRoutes from "./routes/sessionRoute.js"; // Session-related routes

const app = express(); // Initialize Express app

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true })); // Enable CORS with specific origin
app.use(clerkMiddleware()); // Add Clerk authentication middleware

// API routes
app.use("/api/inngest", serve({ client: inngest, functions })); // Inngest API route
app.use("/api/chat", chatRoutes); // Chat API routes
app.use("/api/sessions", sessionRoutes); // Session API routes

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ msg: "api is up and Backend" }); // Respond with API status
});

// Function to start the server
const startServer = async () => {
  try {
    await connectDB(); // Connect to the database
    app.listen(ENV.PORT, () =>
      console.log("Server is running on port:", ENV.PORT) // Log server start
    );
  } catch (error) {
    console.error("💥 Error starting the server", error); // Log errors
  }
};

startServer(); // Start the server
