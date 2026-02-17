import express from "express";
import authUser from "../middlewares/authMiddleware.js";
import allowRoles from "../middlewares/roleMiddleware.js";
import { markAttendance, getMyAttendance, getSessionAttendance, updateAttendance, getBatchAttendance } from "../controller/attendanceController.js";

const attendanceRouter = express.Router();

attendanceRouter.post(
  "/student/sessions/:sessionId/attend",
  authUser,
  allowRoles("student"),
  markAttendance
);

attendanceRouter.get(
  "/student/attendance",
  authUser,
  allowRoles("student"),
  getMyAttendance
);

attendanceRouter.get(
  "/instructor/sessions/:sessionId/attendance",
  authUser,
  allowRoles("instructor"),
  getSessionAttendance
);

attendanceRouter.put(
  "/instructor/sessions/:sessionId/attendance",
  authUser,
  allowRoles("instructor"),
  updateAttendance
);

attendanceRouter.get(
  "/instructor/batches/:batchId/attendance",
  authUser,
  allowRoles("instructor"),
  getBatchAttendance
);

export default attendanceRouter;
