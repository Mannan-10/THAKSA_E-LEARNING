import express from 'express';
import authUser from '../middlewares/authMiddleware.js';
import allowRoles from '../middlewares/roleMiddleware.js';
import { addReview, deleteReview, getCourseRatingSummary, getCourseReviews, updateReview } from '../controller/reviewController.js';

const reviewRouter = express.Router();

reviewRouter.post('/courses/:courseId/reviews', authUser, allowRoles('student'), addReview);
reviewRouter.get('/courses/:courseId/reviews', getCourseReviews);
reviewRouter.get('/courses/:courseId/ratings', getCourseRatingSummary);
reviewRouter.put('/reviews/:reviewId', authUser, allowRoles('admin'), updateReview);
reviewRouter.delete('/reviews/:reviewId', authUser, allowRoles('admin'), deleteReview);

export default reviewRouter;