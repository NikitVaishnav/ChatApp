import mongoose from "mongoose";


// Define User Schema
export const userSchema = new mongoose.Schema({
  password: String,
  name: String,
  email: String,
});
export const User = mongoose.model("User", userSchema);
