import { requireAuth } from "@clerk/express";
import User from "../models/User.js";

// Middleware to protect routes by ensuring the user is authenticated and exists in the database
export const protectRoute = [
  // First middleware ensures the request is authenticated using Clerk
  requireAuth(),
  async (req, res, next) => {
    try {
      // Extract the authenticated user's Clerk ID from the request
      const clerkId = req.auth().userId;

      // If no Clerk ID is found, return an unauthorized error
      if (!clerkId)
        return res
          .status(401)
          .json({ message: "Unauthorized - invalid token" });

      // Find the user in the database using the Clerk ID
      const user = await User.findOne({ clerkId });

      // If the user is not found in the database, return a not found error
      if (!user) return res.status(404).json({ message: "User not found" });

      // Attach the user object to the request for further use in the route handler
      req.user = user;

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      // Log any errors that occur and return an internal server error response
      console.error("Error in protectRoute middleware", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
];
