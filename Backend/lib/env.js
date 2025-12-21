// Import the dotenv library to load environment variables from a .env file
import dotenv from "dotenv";

// Configure dotenv to load environment variables silently (without throwing errors for missing .env files)
dotenv.config({ quiet: true });

// Export an object containing environment variables for use throughout the application
export const ENV = {
  // The port number on which the server will run
  PORT: process.env.PORT,
  
  // The database connection URL
  DB_URL: process.env.DB_URL,
  
  // The current environment (e.g., development, production)
  NODE_ENV: process.env.NODE_ENV,
  
  // The URL of the client application
  CLIENT_URL: process.env.CLIENT_URL,
  
  // Keys for Inngest event handling
  INNGEST_EVENT_KEY: process.env.INNGEST_EVENT_KEY,
  INNGEST_SIGNING_KEY: process.env.INNGEST_SIGNING_KEY,
  
  // API keys for Stream service integration
  STREAM_API_KEY: process.env.STREAM_API_KEY,
  STREAM_API_SECRET: process.env.STREAM_API_SECRET,
};