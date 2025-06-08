import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/router.js";
import chatRouter from "./routes/chatRouter.js";
import http from "http";
import { Server } from "socket.io";

dotenv.config();
const app = express();
const server = http.createServer(app); // Create HTTP server

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected"))
.catch((err)=>console.log("MongoDB connection error:", err));

app.use(express.json());
app.use(cors());

app.use("/api/auth", userRouter);
app.use("/api/chat",chatRouter);

// --- Socket.IO setup ---
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("send-message", (data) => {
    io.to(data.chatId).emit("receive-message", data);
  });

  socket.on("join-chat", (chatId) => {
    socket.join(chatId);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start the server with 'server.listen', NOT 'app.listen'
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`Server running on port ${PORT} !!!!!!!!!`));

