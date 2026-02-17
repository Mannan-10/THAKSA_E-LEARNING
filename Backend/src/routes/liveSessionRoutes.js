import express from "express";
import authUser from "../middlewares/authMiddleware.js";
import allowRoles from "../middlewares/roleMiddleware.js";
import {
  cancelLiveSession,
  createLiveSession,
  endLiveSession,
  getInstructorSessions,
  getStudentJoinLink,
  getStudentSessions,
  startLiveSession,
} from "../controller/liveSessionController.js";

const liveSessionRouter = express.Router();

// Instructor
liveSessionRouter.post(
  "/instructor/batches/:batchId/sessions",
  authUser,
  allowRoles("instructor"),
  createLiveSession
);
liveSessionRouter.get(
  "/instructor/sessions",
  authUser,
  allowRoles("instructor"),
  getInstructorSessions
);
liveSessionRouter.post(
  "/instructor/sessions/:sessionId/start",
  authUser,
  allowRoles("instructor"),
  startLiveSession
);
liveSessionRouter.post(
  "/instructor/sessions/:sessionId/end",
  authUser,
  allowRoles("instructor"),
  endLiveSession
);
liveSessionRouter.post(
  "/instructor/sessions/:sessionId/cancel",
  authUser,
  allowRoles("instructor"),
  cancelLiveSession
);

// Student
liveSessionRouter.get(
  "/student/sessions",
  authUser,
  allowRoles("student"),
  getStudentSessions
);
liveSessionRouter.get(
  "/student/sessions/:sessionId/join",
  authUser,
  allowRoles("student"),
  getStudentJoinLink
);

export default liveSessionRouter;
