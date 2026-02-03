import express from 'express';
import authUser from '../middlewares/authMiddleware.js';
import allowRoles from '../middlewares/roleMiddleware.js'
import { createCourse, getMyCourses } from '../controller/instructorController.js';

const router = express.Router();

router.post('/courses', authUser, allowRoles('instructor'), createCourse);
router.get('/courses', authUser, allowRoles("instructor"), getMyCourses);

export default router;