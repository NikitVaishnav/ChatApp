import express from 'express';

import { registerUser , loginUser, findUserByUsername } from '../controllers/UsersApi.js';

const userRouter = express.Router();


// Route for user registration
userRouter.post('/register', registerUser);

// Route for user login
userRouter.post('/login', loginUser);

// userRouter.get('/',allUsers)
userRouter.get('/find', findUserByUsername);

export default userRouter;