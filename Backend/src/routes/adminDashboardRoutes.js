import express from 'express'
import authUser from '../middlewares/authMiddleware.js';
import allowRoles from '../middlewares/roleMiddleware.js';
import { getAdminDashboardStats } from '../controller/adminDashboardController.js';

const router = express.Router();
router.get('/dashboard', authUser, allowRoles('admin'), getAdminDashboardStats);

export default router