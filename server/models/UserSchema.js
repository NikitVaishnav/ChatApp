import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true }, // <-- Add this line
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // ...other fields if needed
});

export const User = mongoose.model("User", userSchema);