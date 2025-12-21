import mongoose from "mongoose";

// Define the schema for a session
const sessionSchema = new mongoose.Schema(
  {
    // The problem being discussed in the session
    problem: {
      type: String,
      required: true, // This field is mandatory
    },
    // The difficulty level of the problem
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"], // Allowed values for difficulty
      required: true, // This field is mandatory
    },
    // The user who is hosting the session
    host: {
      type: mongoose.Schema.Types.ObjectId, // Reference to a User document
      ref: "User", // Specifies the related collection
      required: true, // This field is mandatory
    },
    // The user who is participating in the session
    participant: {
      type: mongoose.Schema.Types.ObjectId, // Reference to a User document
      ref: "User", // Specifies the related collection
      default: null, // Default value is null if no participant is assigned
    },
    // The current status of the session
    status: {
      type: String,
      enum: ["active", "completed"], // Allowed values for status
      default: "active", // Default status is "active"
    },
    // Identifier for the call associated with the session
    callId: {
      type: String,
      default: "", // Default value is an empty string
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create a Mongoose model for the session schema
const Session = mongoose.model("Session", sessionSchema);

export default Session; // Export the model for use in other parts of the application
