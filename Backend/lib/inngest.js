import { Inngest } from "inngest"; // Importing the Inngest library for event-driven functions
import { connectDB } from "./db.js"; // Importing the database connection function
import User from "../models/User.js"; // Importing the User model
import { deleteStreamUser, upsertStreamUser } from "./stream.js"; // Importing functions to manage Stream users

// Initializing Inngest with the application ID
export const inngest = new Inngest({ id: "HireConnect" });

// Function to sync a new user when a "clerk/user.created" event is triggered
const syncUser = inngest.createFunction(
  { id: "sync-user" }, // Unique ID for the function
  { event: "clerk/user.created" }, // Event to listen for
  async ({ event }) => {
    await connectDB(); // Ensure the database is connected

    // Destructuring user data from the event payload
    const { id, email_addresses, first_name, last_name, image_url } =
      event.data;

    // Creating a new user object to store in the database
    const newUser = {
      clerkId: id, // Clerk user ID
      email: email_addresses[0]?.email_address, // Primary email address
      name: `${first_name || ""} ${last_name || ""}`, // Full name
      profileImage: image_url, // Profile image URL
    };

    await User.create(newUser); // Save the new user to the database

    // Upsert the user in the Stream service
    await upsertStreamUser({
      id: newUser.clerkId.toString(), // Stream user ID
      name: newUser.name, // Stream user name
      image: newUser.profileImage, // Stream user profile image
    });
  }
);

// Function to delete a user from the database and Stream when a "clerk/user.deleted" event is triggered
const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user-from-db" }, // Unique ID for the function
  { event: "clerk/user.deleted" }, // Event to listen for
  async ({ event }) => {
    await connectDB(); // Ensure the database is connected

    const { id } = event.data; // Extracting the user ID from the event payload
    await User.deleteOne({ clerkId: id }); // Delete the user from the database

    await deleteStreamUser(id.toString()); // Remove the user from the Stream service
  }
);

// Exporting the functions to be used by the application
export const functions = [syncUser, deleteUserFromDB];
