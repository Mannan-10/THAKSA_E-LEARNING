import express from 'express';
import { createModule, getCourseModules } from '../controller/moduleController.js';
import authUser from '../middlewares/authMiddleware.js'
import allowRoles from '../middlewares/roleMiddleware.js'

const moduleRouter = express.Router();

moduleRouter.post('/:courseId/modules' ,authUser, allowRoles('instructor'), createModule);
moduleRouter.get('/:courseId/modules', getCourseModules);

export default moduleRouter;