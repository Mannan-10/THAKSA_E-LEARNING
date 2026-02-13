import express from "express";
import { getCourseContent, markLessonComplete } from "../controller/courseContentController.js";
import authUser from "../middlewares/authMiddleware.js";
import allowRoles from "../middlewares/roleMiddleware.js";

const courseContentRouter = express.Router();

courseContentRouter.get("/:courseId/content", authUser, allowRoles("student"), getCourseContent);
courseContentRouter.post("/lessons/:lessonId/complete", authUser, allowRoles("student"), markLessonComplete);

export default courseContentRouter;
