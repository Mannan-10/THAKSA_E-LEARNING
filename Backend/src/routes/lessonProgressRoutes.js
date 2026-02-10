import express from 'express';
import { getCourseProgress, getLessonProgress, getStudentProgress, markLessonCompleted } from '../controller/lessonProgressController.js';
import authUser from '../middlewares/authMiddleware.js';
import allowRoles from '../middlewares/roleMiddleware.js';


const lessonProgressRouter = express.Router();

lessonProgressRouter.post('/student/lessons/:lessonId/progress',authUser, allowRoles('student'), markLessonCompleted);
lessonProgressRouter.get('/student/courses/:courseId/progress',authUser,allowRoles('student'), getCourseProgress);
lessonProgressRouter.get('/student/courses/:courseId/lessons/progress', authUser, allowRoles('student'), getLessonProgress);
lessonProgressRouter.get('/instructor/courses/:courseId/progress',authUser, allowRoles('instructor'), getStudentProgress);


export default lessonProgressRouter;