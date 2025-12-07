
import dotenv from "dotenv";

dotenv.config({quiet: true});

export const ENV = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,

  // Clerk
  CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,

  // Stream 
  STREAM_API_KEY: process.env.STREAM_API_KEY,
  STREAM_API_SECRET: process.env.STREAM_API_SECRET,
};