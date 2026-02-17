import express from 'express';
import authUser from '../middlewares/authMiddleware.js';
import allowRoles from '../middlewares/roleMiddleware.js'
import { createCourse, getMyCourses, toggleCourseActive } from '../controller/instructorController.js';

const router = express.Router();

router.post('/courses', authUser, allowRoles('instructor'), createCourse);
router.get('/courses', authUser, allowRoles("instructor"), getMyCourses);
router.put('/courses/:id/toggle-active', authUser, allowRoles('instructor'), toggleCourseActive);

export default router;