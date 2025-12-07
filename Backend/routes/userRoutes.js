
// src/routes/userRoutes.js
import express from "express";
import { connectDB } from "../lib/db.js";
import User from "../models/User.js";
import {
  syncStreamUser,
  upsertStreamUser,
  deleteStreamUser,
} from "../lib/stream.js"; 

const router = express.Router();

/**
 * Create or update user after Clerk sign-in
 */
router.post("/sync-user", async (req, res) => {
  try {
    await connectDB();

    const { clerkId, email, firstName, lastName, imageUrl } = req.body;
    if (!clerkId || !email) {
      return res
        .status(400)
        .json({ message: "clerkId and email are required" });
    }

    // Upsert user in DB
    const user = await User.findOneAndUpdate(
      { clerkId },
      { email, firstName, lastName, imageUrl },
      { new: true, upsert: true }
    );

    // Ensure name format for Stream
    const name =
      `${firstName || ""} ${lastName || ""}`.trim() || email;

    // 1️⃣ Upsert to Stream directly
    try {
      await upsertStreamUser({
        id: clerkId.toString(),
        name,
        image: imageUrl,
      });
    } catch (err) {
      console.warn("⚠️ Stream upsert failed (ignored):", err.message);
    }

    // 2️⃣ Sync again using DB document format (fallback)
    try {
      await syncStreamUser(user);
    } catch (err) {
      console.warn("⚠️ Stream sync failed (ignored):", err.message);
    }

    return res.status(200).json({
      message: "User synced successfully",
      user,
    });
  } catch (err) {
    console.error("❌ Sync user error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * Delete user (from DB + Stream)
 */
router.delete("/users/:clerkId", async (req, res) => {
  try {
    await connectDB();

    const { clerkId } = req.params;
    if (!clerkId) {
      return res.status(400).json({ message: "clerkId is required" });
    }

    // Delete from DB
    await User.deleteOne({ clerkId });

    // Delete from Stream
    try {
      await deleteStreamUser(clerkId.toString());
    } catch (err) {
      console.warn("⚠️ Stream delete failed (ignored):", err.message);
    }

    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (err) {
    console.error("❌ Delete user error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;

