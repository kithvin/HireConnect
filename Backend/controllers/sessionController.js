import { chatClient, streamClient } from "../lib/stream.js";
import Session from "../models/Session.js";

export async function createSession(req, res) {
  try {
    const { problem, difficulty } = req.body; // Extract problem and difficulty from the request body
    const userId = req.user._id; // Get the user ID from the authenticated user
    const clerkId = req.user.clerkId; // Get the clerk ID from the authenticated user

    if (!problem || !difficulty) {
      // Validate required fields
      return res.status(400).json({ message: "Problem and difficulty are required" });
    }

    // Generate a unique call ID for the video session
    const callId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    // Create a new session in the database
    const session = await Session.create({ problem, difficulty, host: userId, callId });

    // Create a video call using the Stream API
    await streamClient.video.call("default", callId).getOrCreate({
      data: {
        created_by_id: clerkId, // Set the creator of the call
        custom: { problem, difficulty, sessionId: session._id.toString() }, // Add custom metadata
      },
    });

    // Create a chat channel for the session
    const channel = chatClient.channel("messaging", callId, {
      name: `${problem} Session`, // Set the channel name
      created_by_id: clerkId, // Set the creator of the channel
      members: [clerkId], // Add the clerk as the initial member
    });

    await channel.create(); // Create the chat channel

    res.status(201).json({ session }); // Respond with the created session
  } catch (error) {
    console.log("Error in createSession controller:", error.message); // Log the error
    res.status(500).json({ message: "Internal Server Error" }); // Respond with a server error
  }
}

export async function getActiveSessions(_, res) {
  try {
    // Fetch active sessions from the database
    const sessions = await Session.find({ status: "active" })
      .populate("host", "name profileImage email clerkId") // Populate host details
      .populate("participant", "name profileImage email clerkId") // Populate participant details
      .sort({ createdAt: -1 }) // Sort by creation date (newest first)
      .limit(20); // Limit the number of sessions to 20

    res.status(200).json({ sessions }); // Respond with the active sessions
  } catch (error) {
    console.log("Error in getActiveSessions controller:", error.message); // Log the error
    res.status(500).json({ message: "Internal Server Error" }); // Respond with a server error
  }
}

export async function getMyRecentSessions(req, res) {
  try {
    const userId = req.user._id; // Get the user ID from the authenticated user

    // Fetch completed sessions where the user is either the host or participant
    const sessions = await Session.find({
      status: "completed",
      $or: [{ host: userId }, { participant: userId }],
    })
      .sort({ createdAt: -1 }) // Sort by creation date (newest first)
      .limit(20); // Limit the number of sessions to 20

    res.status(200).json({ sessions }); // Respond with the user's recent sessions
  } catch (error) {
    console.log("Error in getMyRecentSessions controller:", error.message); // Log the error
    res.status(500).json({ message: "Internal Server Error" }); // Respond with a server error
  }
}

export async function getSessionById(req, res) {
  try {
    const { id } = req.params; // Extract the session ID from the request parameters

    // Fetch the session by ID and populate host and participant details
    const session = await Session.findById(id)
      .populate("host", "name email profileImage clerkId")
      .populate("participant", "name email profileImage clerkId");

    if (!session) return res.status(404).json({ message: "Session not found" }); // Check if session exists

    res.status(200).json({ session }); // Respond with the session details
  } catch (error) {
    console.log("Error in getSessionById controller:", error.message); // Log the error
    res.status(500).json({ message: "Internal Server Error" }); // Respond with a server error
  }
}

export async function joinSession(req, res) {
  try {
    const { id } = req.params; // Extract the session ID from the request parameters
    const userId = req.user._id; // Get the user ID from the authenticated user
    const clerkId = req.user.clerkId; // Get the clerk ID from the authenticated user

    const session = await Session.findById(id); // Fetch the session by ID

    if (!session) return res.status(404).json({ message: "Session not found" }); // Check if session exists

    if (session.status !== "active") {
      // Ensure the session is active
      return res.status(400).json({ message: "Cannot join a completed session" });
    }

    if (session.host.toString() === userId.toString()) {
      // Prevent the host from joining as a participant
      return res.status(400).json({ message: "Host cannot join their own session as participant" });
    }

    // Check if the session already has a participant
    if (session.participant) return res.status(409).json({ message: "Session is full" });

    session.participant = userId; // Set the participant
    await session.save(); // Save the updated session

    const channel = chatClient.channel("messaging", session.callId); // Get the chat channel
    await channel.addMembers([clerkId]); // Add the participant to the chat channel

    res.status(200).json({ session }); // Respond with the updated session
  } catch (error) {
    console.log("Error in joinSession controller:", error.message); // Log the error
    res.status(500).json({ message: "Internal Server Error" }); // Respond with a server error
  }
}

export async function endSession(req, res) {
  try {
    const { id } = req.params; // Extract the session ID from the request parameters
    const userId = req.user._id; // Get the user ID from the authenticated user

    const session = await Session.findById(id); // Fetch the session by ID

    if (!session) return res.status(404).json({ message: "Session not found" }); // Check if session exists

    // Ensure the user is the host
    if (session.host.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Only the host can end the session" });
    }

    // Check if the session is already completed
    if (session.status === "completed") {
      return res.status(400).json({ message: "Session is already completed" });
    }

    // Delete the video call using the Stream API
    const call = streamClient.video.call("default", session.callId);
    await call.delete({ hard: true });

    // Delete the chat channel using the Stream API
    const channel = chatClient.channel("messaging", session.callId);
    await channel.delete();

    session.status = "completed"; // Mark the session as completed
    await session.save(); // Save the updated session

    res.status(200).json({ session, message: "Session ended successfully" }); // Respond with the updated session
  } catch (error) {
    console.log("Error in endSession controller:", error.message); // Log the error
    res.status(500).json({ message: "Internal Server Error" }); // Respond with a server error
  }
}