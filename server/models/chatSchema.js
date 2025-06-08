import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  isGroup: { type: Boolean, default: false },
  name: { type: String }, // group name, optional for 1-on-1
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // participants
  latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Chat", chatSchema);