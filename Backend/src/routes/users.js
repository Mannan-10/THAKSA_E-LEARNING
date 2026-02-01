import express from 'express';
import { getProfile, login, register } from '../controller/userController.js';

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/profile', getProfile);

export default userRouter;