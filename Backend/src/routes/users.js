import express from 'express';
import { getProfile, login, register, verifyOtp } from '../controller/userController.js';

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/verify-otp', verifyOtp)
userRouter.get('/profile', getProfile);

export default userRouter;