import express from 'express';
import { createChat, getUserChats } from '../controllers/ChatController.js';
const chatRouter = express.Router();

chatRouter.post('/create',createChat);
chatRouter.get('/list',getUserChats);

export default chatRouter;
