import express from 'express';
import { createLesson, getModuleLessons } from '../controller/lessonController.js';
import authUser from '../middlewares/authMiddleware.js';
import allowRoles from '../middlewares/roleMiddleware.js';

const lessonRouter = express.Router()

lessonRouter.post('/:moduleId/lessons', authUser, allowRoles('instructor'), createLesson);
lessonRouter.get('/:moduleId/lessons', getModuleLessons)

export default lessonRouter;