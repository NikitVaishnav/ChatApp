import mongoose from "mongoose";
import Chat from "../models/chatSchema.js";

export const createChat = async (req, res) => {
  try {
    const { users, isGroup, name } = req.body;
    console.log("Received users:", users);
    if (!users || users.length < 2) {
      return res.status(400).json({ success: false, message: "At least two users required" });
    }
    const chat = new Chat({ users, isGroup: !!isGroup, name });
    await chat.save();
    res.status(201).json({ success: true, chat });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create chat", error: error.message });
  }
};

export const getUserChats = async (req, res) => {
  try {
    const userId = req.query.userId; // or req.user._id if using auth middleware
     if (!userId) {
      console.error("No userId provided in query");
      return res.status(400).json({ success: false, message: "userId required" });
    }
     // Validate userId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.error("Invalid userId format:", userId);
      return res.status(400).json({ success: false, message: "Invalid userId format" });
    }
     const userObjectId = new mongoose.Types.ObjectId(userId);
    console.log("Fetching chats for userId:", userObjectId);
    const chats = await Chat.find({ users: userObjectId }).populate("users", "name email");
     console.log("Chats found:", chats.length);
    res.json({ success: true, chats });
  } catch (error) {
     console.error("Error in getUserChats:", error); // <--- This will show the real error
    res.status(500).json({ success: false, message: "Failed to fetch chats", error: error.message });
  }
};