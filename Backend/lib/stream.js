// Importing the StreamChat and StreamClient libraries for interacting with Stream API
import { StreamChat } from "stream-chat";
import { StreamClient } from "@stream-io/node-sdk";
// Importing environment variables
import { ENV } from "./env.js";

// Extracting API key and secret from environment variables
const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

// Logging an error if API key or secret is missing
if (!apiKey || !apiSecret) {
  console.error("STREAM_API_KEY or STREAM_API_SECRET is missing");
}

// Initializing the StreamChat client instance
export const chatClient = StreamChat.getInstance(apiKey, apiSecret); 
// Initializing the StreamClient instance for server-side operations
export const streamClient = new StreamClient(apiKey, apiSecret); 

// Function to upsert (create or update) a Stream user
export const upsertStreamUser = async (userData) => {
  try {
    // Upserting the user in Stream
    await chatClient.upsertUser(userData);
    console.log("Stream user upserted successfully:", userData);
  } catch (error) {
    // Logging an error if upsert fails
    console.error("Error upserting Stream user:", error);
  }
};

// Function to delete a Stream user
export const deleteStreamUser = async (userId) => {
  try {
    // Deleting the user from Stream
    await chatClient.deleteUser(userId);
    console.log("Stream user deleted successfully:", userId);
  } catch (error) {
    // Logging an error if delete fails
    console.error("Error deleting the Stream user:", error);
  }
};