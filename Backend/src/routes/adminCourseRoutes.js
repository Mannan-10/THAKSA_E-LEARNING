import express from 'express';
import allowRoles from '../middlewares/roleMiddleware.js';
import authUser from '../middlewares/authMiddleware.js'
import { approveCourse, getApprovedCourses, getPendingCourses, getRejectedCourses, rejectCourse } from '../controller/adminCourseController.js';

const adminCourseRouter = express.Router();

adminCourseRouter.get('/courses/pending', authUser, allowRoles("admin"), getPendingCourses);
adminCourseRouter.put('/courses/:id/approve', authUser, allowRoles('admin'), approveCourse);
adminCourseRouter.put('/courses/:id/reject', authUser, allowRoles('admin'), rejectCourse);
adminCourseRouter.get('/courses/approved', authUser, allowRoles('admin'), getApprovedCourses);
adminCourseRouter.get('/courses/rejected', authUser, allowRoles('admin'), getRejectedCourses);

export default adminCourseRouter;