import express from 'express';
import allowRoles from '../middlewares/roleMiddleware.js';
import authUser from '../middlewares/authMiddleware.js'
import { approveCourse, getPendingCourses, rejectCourse } from '../controller/adminCourseController.js';

const adminCourseRouter = express.Router();

adminCourseRouter.get('/courses/pending', authUser, allowRoles("admin"), getPendingCourses);
adminCourseRouter.put('/courses/:id/approve', authUser, allowRoles('admin'), approveCourse);
adminCourseRouter.put('/courses/:id/reject', authUser, allowRoles('admin'), rejectCourse);

export default adminCourseRouter;