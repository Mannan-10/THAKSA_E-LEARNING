import express from 'express';
import { changePassword, getProfile, login, logout, refreshToken, register, updateProfile, verifyOtp } from '../controller/userController.js';
import authUser from '../middlewares/authMiddleware.js';

const userRouter = express.Router();

// Auth
userRouter.post('/register', register);
userRouter.post('/verify-otp', verifyOtp);
userRouter.post('/login', login);
userRouter.post('/refresh-token', refreshToken);
userRouter.post('/logout', logout);

// Profile
userRouter.get('/profile',authUser, getProfile);
userRouter.put('/profile', authUser, updateProfile);
userRouter.put('/change-password', authUser, changePassword);

export default userRouter;