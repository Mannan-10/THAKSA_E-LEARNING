import express from 'express';
import { enrollBatch, getMyEnrollments } from '../controller/enrollmentController.js';
import authUser from '../middlewares/authMiddleware.js';
import allowRoles from '../middlewares/roleMiddleware.js';

const enrollmentRouter = express.Router()

enrollmentRouter.post('/student/batches/:batchId/enroll', authUser, allowRoles('student'), enrollBatch)
enrollmentRouter.get('/student/enrollments', authUser, allowRoles('student'), getMyEnrollments)

export default enrollmentRouter;