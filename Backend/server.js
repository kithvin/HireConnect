// import express from "express";
// import { ENV } from "./lib/env.js";
// import { serve } from "./lib/inngest/express";
// import { connect } from "mongoose";
// import path from "path";
// import cors from "cors";

// const app = express();

// const __dirname = path.resolve();

// // Middleware
// app.use(express.json());
// app.use(cors({origin:ENV.CLIENT_URL, credentials:true}));

// app.use("/api/inngest", serve)

// console.log("📌 Server Port:", ENV.PORT);
// console.log("🔑 DB URL Loaded");

// // MongoDB Connection with Error Handling + Retry
// const connectDB = async () => {
//   try {
//     await connect(ENV.DB_URL);
//     console.log("🟢 Connected to MongoDB Successfully 🚀");

//     // Start Server after DB connects
//     app.listen(ENV.PORT, () => {
//       console.log(`💼 HireConnect Backend is live on PORT ${ENV.PORT} 🚀`);
//     });

//   } catch (error) {
//     console.error("🔴 MongoDB Connection Failed ❌");
//     console.error("📛 Error:", error.message);

//     // Retry after 5 seconds
//     console.log("⏳ Retrying in 5 seconds...");
//     setTimeout(connectDB, 5000);
//   }
// };

// // Test route
// app.get("/", (req, res) => {
//   res.send("🔥 HireConnect Backend API is Running! 🔁");
// });

// // Start DB connection
// await connectDB();

// import express from "express";
// import cors from "cors";
// import { ENV } from "./lib/env.js";
// import { inngest, syncUser, deleteUserFromDB } from "./lib/inngest.js";
// import { serve } from "inngest/express"; // ✅ FIX: correct import

// const app = express();

// // Middlewares
// app.use(express.json());
// app.use(
//   cors({
//     origin: ENV.CLIENT_URL,
//     credentials: true,
//   })
// );

// // Inngest route
// app.use(
//   "/api/inngest",
//   serve({
//     client: inngest,
//     functions: [syncUser, deleteUserFromDB],
//   })
// );

// console.log("📌 Server Port:", ENV.PORT);
// console.log("🔑 DB URL Loaded");

// // Test route
// app.get("/", (req, res) => {
//   res.send("🔥 HireConnect Backend API is Running! 🚀");
// });

// // Start server
// app.listen(ENV.PORT, () => {
//   console.log(`💼 Server Running on PORT ${ENV.PORT} 🟢`);
// });

import express from "express";
import { ENV } from "./lib/env.js";
import { connect } from "mongoose";
import path from "path";
import cors from "cors";

// Inngest imports (fixed)
import { serve } from "inngest/express";
import { inngest, syncUser, deleteUserFromDB } from "./lib/inngest.js";

const app = express();

const __dirname = path.resolve();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  })
);

// Inngest route (serve must be called with config)
app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions: [syncUser, deleteUserFromDB],
  })
);

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
connectDB();
