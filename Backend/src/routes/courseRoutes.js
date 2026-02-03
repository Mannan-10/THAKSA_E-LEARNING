import express from 'express';
import { getApprovedCourses } from '../controller/courseController.js';

const courseRouter = express.Router();
courseRouter.get('/', getApprovedCourses);

export default courseRouter;