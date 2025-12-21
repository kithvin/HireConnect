import mongoose from "mongoose";

// Define the schema for the User model
const userSchema = new mongoose.Schema(
  {
    // User's name, required field
    name: {
      type: String,
      required: true,
    },
    // User's email, required and must be unique
    email: {
      type: String,
      required: true,
      unique: true,
    },
    // URL or path to the user's profile image, optional with a default value
    profileImage: {
      type: String,
      default: "",
    },
    // Clerk ID for the user, required and must be unique
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  // Automatically add createdAt and updatedAt timestamps
  { timestamps: true } 
);

// Create the User model using the schema
const User = mongoose.model("User", userSchema);

// Export the User model for use in other parts of the application
export default User;