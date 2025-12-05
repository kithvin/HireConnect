// import { Inngest} from "inngest";
// import { serve as inngestServe } from "inngest/express";
// import { connectDB} from "./db.js";
// import User from "../models/User.js";

// export const inngest = new Inngest({ id: "HireConnect" });

// const syncUser = inngest.createFunction(
//     {id:"sync-user"},
//     {event:"clerk/user.created" },
//     async ({event})=>{
//         await connectDB();
//         const {id,email_addresses,first_name,last_name,image_url} = event.data;
//         const newUser = new User({
//             clerkId:id,
//             email:email_addresses[0].email_address,
//             name:`${first_name || ""} ${last_name || ""}`,
//             profileImage:image_url,
//         })
//         await User.create(newUser);
//         console.log("User Created Successfully");
//     }
// )

// const deleteUserFromDB = inngest.createFunction(
//     {id:"delete-user-from-db"},
//     {event:"clerk/user.deleted" },
//     async ({event})=>{
//         await connectDB();
//         const {id} = event.data;
//         await User.deleteOne({clerkId:id});
//         console.log("User Created Successfully");
//     }
// )

// export const functions = [syncUser];

import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import User from "../models/User.js";

export const inngest = new Inngest({ id: "HireConnect" });

export const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    await connectDB();
    const { id, email_addresses, first_name, last_name, image_url } = event.data;

    await User.create({
      clerkid: id,
      email: email_addresses[0].email_address,
      name: `${first_name || ""} ${last_name || ""}`,
      profileImage: image_url,
    });

    console.log("🟢 User Created Successfully");
    return "User Created";
  }
);

export const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    await connectDB();
    const { id } = event.data;

    await User.deleteOne({ clerkid: id });

    console.log("🔴 User Deleted Successfully");
    return "User Deleted";
  }
);
