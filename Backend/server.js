import express from "express";
import { ENV } from "./lib/env.js";
import { connect } from "mongoose";

const app = express();

console.log("📌 Server Port:", ENV.PORT);
console.log("🔑 DB URL Loaded");

// MongoDB Connection with Error Handling + Retry
const connectDB = async () => {
  try {
    await connect(ENV.DB_URL);
    console.log("🟢 Connected to MongoDB Successfully 🚀");

    // Start Server after DB connects
    app.listen(ENV.PORT, () => {
      console.log(`💼 HireConnect Backend is live on PORT ${ENV.PORT} 🚀`);
    });

  } catch (error) {
    console.error("🔴 MongoDB Connection Failed ❌");
    console.error("📛 Error:", error.message);

    // Retry after 5 seconds
    console.log("⏳ Retrying in 5 seconds...");
    setTimeout(connectDB, 5000);
  }
};

// Test route
app.get("/", (req, res) => {
  res.send("🔥 HireConnect Backend API is Running! 🔁");
});

// Start DB connection
await connectDB();
