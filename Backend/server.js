import express from "express";
import cors from "cors";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import userRoutes from "./routes/userRoutes.js";
import { clerkMiddleware } from "@clerk/express";
import { protectRoute } from "./middleware/protectedRoute.js";

const app = express();

//Clerk middleware 
app.use(clerkMiddleware());

//  CORS
app.use(
  cors({
    origin: ["http://localhost:3000", "https://hireconnect-murex.vercel.app"],
    credentials: true,
  })
);

// 🟡 JSON body parser
app.use(express.json());

// ✅ Public health check
app.get("/", (req, res) => {
  console.log("HIT /");
  res.send("🚀 Backend working! 😄");
});

// ✅ Protected Video Calls route
app.get("/video-calls", protectRoute, (req, res) => {
  console.log("HIT /video-calls handler");
  res.send("🎥 Video Calls service is up and running! ✅");
});

// ✅ API routes
app.use("/api", userRoutes);

// ------------- Local vs Vercel -------------
const port = ENV.PORT || process.env.PORT || 5000;

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




