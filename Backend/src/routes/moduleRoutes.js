import express from 'express';
import { createModule, getCourseModules, updateModule, deleteModule } from '../controller/moduleController.js';
import authUser from '../middlewares/authMiddleware.js'
import allowRoles from '../middlewares/roleMiddleware.js'

const moduleRouter = express.Router();

moduleRouter.post('/:courseId/modules', authUser, allowRoles('instructor'), createModule);
moduleRouter.get('/:courseId/modules', getCourseModules);
moduleRouter.put('/modules/:moduleId', authUser, allowRoles('instructor'), updateModule);
moduleRouter.delete('/modules/:moduleId', authUser, allowRoles('instructor'), deleteModule);

export default moduleRouter;