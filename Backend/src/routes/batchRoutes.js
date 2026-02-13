import express from 'express';
import authUser from '../middlewares/authMiddleware.js';
import allowRoles from '../middlewares/roleMiddleware.js';
import { createBatch, getAvailableBatches, getInstructorBatches, getMyBatch, getMyBatches } from '../controller/batchController.js';

const batchRouter = express.Router()

batchRouter.post('/instructor/courses/:courseId/batches', authUser, allowRoles('instructor'), createBatch);
batchRouter.get('/instructor/batches', authUser, allowRoles('instructor'), getInstructorBatches);
batchRouter.get('/student/my-batch', authUser, allowRoles('student'), getMyBatch);
batchRouter.get('/student/batches', authUser, allowRoles('student'), getMyBatches);
batchRouter.get('/batches', authUser, allowRoles('student'), getAvailableBatches);

export default batchRouter;