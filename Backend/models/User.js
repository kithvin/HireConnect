// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     name:{
//     type:String,
//     required:true,
// }, 
//    email:{
//     type:String,
//     required:true,
//     unique:true,
// },
//     profileImage:{
//     type:String,
//     default:"",
// },
// clerkid:{
//     type:String,
//     required:true,
//     unique:true,
// }
// },{timestamps:true}); // createdAt , updatedAt

// const User = mongoose.model("User", userSchema);

// export default User;

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true },
    email: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

// Avoid model overwrite in dev / serverless
export default mongoose.models.User || mongoose.model("User", userSchema);