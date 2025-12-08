import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true },
    email: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

// Avoid model overwrite in dev / serverless
export default mongoose.models.User || mongoose.model("User", userSchema);