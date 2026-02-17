import express from 'express';
import authUser from '../middlewares/authMiddleware.js';
import allowRoles from '../middlewares/roleMiddleware.js';
import {
  createBatch,
  getCourseBatches,
  getInstructorBatches,
  getPublicBatches,
} from '../controller/batchController.js';

const batchRouter = express.Router()

batchRouter.get('/batches', getPublicBatches);
batchRouter.get('/courses/:courseId/batches', getCourseBatches);
batchRouter.post('/instructor/courses/:courseId/batches', authUser, allowRoles('instructor'), createBatch);
batchRouter.get('/instructor/batches', authUser, allowRoles('instructor'), getInstructorBatches);

export default batchRouter;
