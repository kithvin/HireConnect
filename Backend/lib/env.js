import dotenv from "dotenv";

// Load environment variables from a .env file, suppressing warnings if the file is missing
dotenv.config({quiet: true});

export const ENV = {
  // Application port
  PORT: process.env.PORT,
  
  // Database connection URL
  DB_URL: process.env.DB_URL,

  // Clerk API keys for authentication
  CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,

  // Stream API keys for real-time functionality
  STREAM_API_KEY: process.env.STREAM_API_KEY,
  STREAM_API_SECRET: process.env.STREAM_API_SECRET,
};