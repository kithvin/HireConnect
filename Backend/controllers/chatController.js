// Import the chatClient instance from the Stream library
import { chatClient } from "../lib/stream.js";

// Controller function to generate and return a Stream token for the authenticated user
export async function getStreamToken(req, res) {
  try {
    // Generate a Stream token using the user's Clerk ID
    const token = chatClient.createToken(req.user.clerkId);

    // Respond with the generated token and user details
    res.status(200).json({
      token, // Stream token for the user
      userId: req.user.clerkId, // User's Clerk ID
      userName: req.user.name, // User's name
      userImage: req.user.image, // User's profile image
    });
  } catch (error) {
    // Log the error message for debugging purposes
    console.log("Error in getStreamToken controller:", error.message);

    // Respond with a 500 status code and an error message
    res.status(500).json({ message: "Internal Server Error" });
  }
}