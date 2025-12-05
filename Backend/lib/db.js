// import mongoose from "mongoose";

// import ENV from "../env.js";

// export const connectDB = async () => {
//   try {
//     if (!ENV.DB_URL) {
//       throw new Error("❌ MongoDB URL is not defined in the environment variables ❌");
//     }
//     await mongoose.connect(ENV.DB_URL);
//     console.log("✅ MongoDB Connection Successful 🎯",conn.connection.host);
//   } catch (error) {
//     console.error("🔴 Error connecting to MongoDB ❌", error);
//     process.exit(1); // 0 indicates success, 1 indicates failure
//   }
// };

import mongoose from "mongoose";
import { ENV } from "./env.js";

export async function connectDB() {
  try {
    const conn = await mongoose.connect(ENV.DB_URL);
    console.log("🟢 MongoDB Connected:", conn.connection.host);
  } catch (error) {
    console.error("❌ DB Connection Error:", error.message);
  }
}
