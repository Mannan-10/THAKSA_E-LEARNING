import express from "express";
import { getCourseContent, markLessonComplete } from "../controller/courseContentController.js";
import authUser from "../middlewares/authMiddleware.js";
import allowRoles from "../middlewares/roleMiddleware.js";

const courseContentRouter = express.Router();

// GET course content: auth required; role-based access enforced inside the controller
// (admin: all courses; instructor: own courses only; student: enrolled courses only)
courseContentRouter.get("/:courseId/content", authUser, getCourseContent);

// Mark lesson complete: students only — role check at route level is appropriate here
courseContentRouter.post("/lessons/:lessonId/complete", authUser, allowRoles("student"), markLessonComplete);

export default courseContentRouter;
