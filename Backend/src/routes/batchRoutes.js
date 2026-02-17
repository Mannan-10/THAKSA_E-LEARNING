import express from 'express';
import authUser from '../middlewares/authMiddleware.js';
import allowRoles from '../middlewares/roleMiddleware.js';
import {
  createBatch,
  getCourseBatches,
  getInstructorBatches,
  getPublicBatches,
} from '../controller/batchController.js';
import { getBatchStudents, removeStudentFromBatch } from '../controller/instructorStudentController.js';

const batchRouter = express.Router()

batchRouter.get('/batches', getPublicBatches);
batchRouter.get('/courses/:courseId/batches', getCourseBatches);
batchRouter.post('/instructor/courses/:courseId/batches', authUser, allowRoles('instructor'), createBatch);
batchRouter.get('/instructor/batches', authUser, allowRoles('instructor'), getInstructorBatches);
batchRouter.get('/instructor/batches/:batchId/students', authUser, allowRoles('instructor'), getBatchStudents);
batchRouter.delete('/instructor/batches/:batchId/students/:studentId', authUser, allowRoles('instructor'), removeStudentFromBatch);

export default batchRouter;
