import express from 'express';
import authUser from '../middlewares/authMiddleware.js';
import allowRoles from '../middlewares/roleMiddleware.js';
import { generateCourseCertificate, getAllCertificates, getMyCertificates } from '../controller/certificateController.js';

const certificateRouter = express.Router();

certificateRouter.post('/student/courses/:courseId/certificate',authUser, allowRoles('student'), generateCourseCertificate);
certificateRouter.get('/student/certificates', authUser, allowRoles('student'), getMyCertificates);
certificateRouter.get('/admin/certificates', authUser, allowRoles('admin'), getAllCertificates)

export default certificateRouter;