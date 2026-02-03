import express from 'express';
import authUser from '../middlewares/authMiddleware.js';
import allowRoles from '../middlewares/roleMiddleware.js';
import { createBatch, getInstructorBatches } from '../controller/batchController.js';

const batchRouter = express.Router()

batchRouter.post('/instructor/courses/:courseId/batches', authUser, allowRoles('instructor'), createBatch);
batchRouter.get('/instructor/batches', authUser, allowRoles('instructor'), getInstructorBatches);

export default batchRouter;