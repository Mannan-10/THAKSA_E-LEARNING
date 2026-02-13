import express from 'express';
import { getApprovedCourses, getPublicCourses } from '../controller/courseController.js';

const courseRouter = express.Router();
courseRouter.get('/', getApprovedCourses);
courseRouter.get('/public', getPublicCourses);

export default courseRouter;