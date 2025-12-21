// Importing the express library to create a router
import express from "express";

// Importing the controller function to handle the "/token" route
import { getStreamToken } from "../controllers/chatController.js";

// Importing middleware to protect routes (ensures only authorized users can access)
import { protectRoute } from "../middleware/protectRoute.js";

// Creating a new router instance
const router = express.Router();

// Defining a GET route at "/token"
// This route is protected by the "protectRoute" middleware and handled by the "getStreamToken" controller
router.get("/token", protectRoute, getStreamToken);

// Exporting the router to be used in other parts of the application
export default router;