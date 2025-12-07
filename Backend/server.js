import express from "express";
import cors from "cors";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// ✅ CORS 
app.use(
  cors({
    origin: ["http://localhost:3000","https://hireconnect-murex.vercel.app"],
    credentials: true,
  })
);

// ✅ Parse JSON bodies
app.use(express.json());

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("🚀 Backend working! 😄");
});

// ✅ API routes
app.use("/api", userRoutes);

// ------------- Local vs Vercel -------------

const port = ENV.PORT || process.env.PORT || 5000;

// Local dev: start server + connect DB
if (!process.env.VERCEL) {
  app.listen(port, async () => {
    try {
      await connectDB();
      console.log("✅ MongoDB connected");
    } catch (err) {
      console.error("❌ MongoDB connection failed:", err.message);
    }
    console.log(`🚀 Server running on port ${port}`);
  });
}


export default app;
