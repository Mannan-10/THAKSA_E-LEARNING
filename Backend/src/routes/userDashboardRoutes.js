import express from "express";
import authUser from "../middlewares/authMiddleware.js";
import allowRoles from "../middlewares/roleMiddleware.js";
import { getUserDashboard, getStudentCourseDetail } from "../controller/userDashboardController.js";

const userDashboardRouter = express.Router();

userDashboardRouter.get("/dashboard", authUser, allowRoles("student"), getUserDashboard);
userDashboardRouter.get("/student/courses/:courseId/detail", authUser, allowRoles("student"), getStudentCourseDetail);

export default userDashboardRouter;
