import express from 'express';
import authUser from '../middlewares/authMiddleware.js';
import allowRoles from '../middlewares/roleMiddleware.js';
import { getUserDashboard } from '../controller/userDashboardController.js';

const userDashboardRouter = express.Router();

userDashboardRouter.get('/dashboard', authUser, allowRoles('student'), getUserDashboard);

export default userDashboardRouter;
