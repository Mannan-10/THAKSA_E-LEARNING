import express from 'express';
import { getAllPayments, getInstructorPayments, getMyPayments, makePayment } from '../controller/paymentController.js';
import authUser from '../middlewares/authMiddleware.js';
import allowRoles from '../middlewares/roleMiddleware.js';

const paymentRouter = express.Router();

paymentRouter.post('/student/payments', authUser, allowRoles('student'), makePayment);
paymentRouter.get('/student/payments', authUser, allowRoles('student'), getMyPayments);
paymentRouter.get('/instructor/payments', authUser, allowRoles('instructor'), getInstructorPayments);
paymentRouter.get('/admin/payments', authUser, allowRoles('admin'), getAllPayments);


export default paymentRouter;