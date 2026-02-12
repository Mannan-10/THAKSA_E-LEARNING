import express from 'express';
import authUser from '../middlewares/authMiddleware.js';
import allowRoles from '../middlewares/roleMiddleware.js';
import { getInstructorDashboardStats } from '../controller/instructorDashboardController.js';

const instructorDashboardRouter = express.Router();

instructorDashboardRouter.get('/dashboard', authUser, allowRoles('instructor'), getInstructorDashboardStats);

export default instructorDashboardRouter;
