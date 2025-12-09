import express from "express";
import { getStreamToken } from "../controllers/chatController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

// Route to get a stream token, protected by authentication middleware
router.get("/token",protectRoute,getStreamToken);

export default router;