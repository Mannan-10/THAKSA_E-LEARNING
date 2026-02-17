import express from 'express';
import { createLesson, getModuleLessons, updateLesson, deleteLesson } from '../controller/lessonController.js';
import authUser from '../middlewares/authMiddleware.js';
import allowRoles from '../middlewares/roleMiddleware.js';

const lessonRouter = express.Router()

lessonRouter.post('/:moduleId/lessons', authUser, allowRoles('instructor'), createLesson);
lessonRouter.get('/:moduleId/lessons', getModuleLessons);
lessonRouter.put('/lessons/:lessonId', authUser, allowRoles('instructor'), updateLesson);
lessonRouter.delete('/lessons/:lessonId', authUser, allowRoles('instructor'), deleteLesson);

export default lessonRouter;