import mongoose from "mongoose";

// Define the schema and model for managing coding session data
const sessionSchema = new mongoose.Schema({
    problem: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        enum: ["Easy", "Medium", "Hard"],
        required: true,
    },
    host:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    participants: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
    status: {
        type: String,
        enum: ["active", "completed"],
        default: "active",
    },
    callId: {
        type: String,
        default: "",
    },
},{ timestamps: true});

const Session = mongoose.model("Session", sessionSchema);
export default Session;

// Function to create a new session in the database
export const createSession = async (sessionData) => {
  try {
    const session = new Session(sessionData);
    await session.save();
    return session;
  } catch (error) {
    throw new Error("Error creating session");
  }
};