import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/router.js";

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected"))
.catch((err)=>console.log("MongoDB connection error:", err));

app.use(express.json());
app.use(cors());

app.use("/api/auth", userRouter);

