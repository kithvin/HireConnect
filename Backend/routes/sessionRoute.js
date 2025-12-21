import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  createSession,
  endSession,
  getActiveSessions,
  getMyRecentSessions,
  getSessionById,
  joinSession,
} from "../controllers/sessionController.js";

const router = express.Router();

// Route to create a new session (protected)
router.post("/", protectRoute, createSession);

// Route to get all active sessions (protected)
router.get("/active", protectRoute, getActiveSessions);

// Route to get the recent sessions of the logged-in user (protected)
router.get("/my-recent", protectRoute, getMyRecentSessions);

// Route to get details of a specific session by ID (protected)
router.get("/:id", protectRoute, getSessionById);

// Route to join a specific session by ID (protected)
router.post("/:id/join", protectRoute, joinSession);

// Route to end a specific session by ID (protected)
router.post("/:id/end", protectRoute, endSession);

export default router;