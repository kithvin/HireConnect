import { getAuth } from "@clerk/express";
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
  try {
    // Clerk reads auth info from cookies / Authorization header
    const auth = getAuth(req);
    console.log("Clerk auth object:", auth); // debug

    const userId = auth?.userId;

    // ❌ Not authenticated
    if (!userId) {
      return res
        .status(401)
        .send("🔒 Authentication required please log in.");
    }

    // ✅ Find user in MongoDB
    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach user to request for later (e.g., for use in subsequent middleware or route handlers)
    req.user = user;

    next();
  } catch (error) {
    console.error("Error in protectRoute middleware:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default protectRoute;