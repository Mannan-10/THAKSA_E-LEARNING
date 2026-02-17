import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Grid,
  IconButton,
  LinearProgress,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { getCourseContent, markComplete } from "../../services/courseService";
import { getStudentCourseDetail, markSessionAttendance } from "../../services/userServices";
import useToast from "../../hooks/useToast";

const cardSx = {
  borderRadius: 3,
  border: "1px solid #e2e8f0",
  boxShadow: "0 14px 26px rgba(15,23,42,0.05)",
};

const sessionStatusColors = {
  scheduled: { bg: "#e0f2fe", color: "#0c4a6e" },
  live: { bg: "#dcfce7", color: "#166534" },
  completed: { bg: "#f1f5f9", color: "#475569" },
  cancelled: { bg: "#fee2e2", color: "#991b1b" },
};

export default function CourseLearning() {
  const { courseId } = useParams();
  const { showToast } = useToast();
  const [tab, setTab] = useState(0);
  const [modules, setModules] = useState([]);
  const [detail, setDetail] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState(false);
  const [markingSession, setMarkingSession] = useState(null);

  const loadContent = useCallback(async () => {
    try {
      const [contentData, detailData] = await Promise.all([
        getCourseContent(courseId),
        getStudentCourseDetail(courseId),
      ]);
      setModules(contentData || []);
      setDetail(detailData);
      if (!currentLesson && contentData?.length > 0 && contentData[0].lessons?.length > 0) {
        setCurrentLesson(contentData[0].lessons[0]);
      }
    } catch (err) {
      showToast(err?.response?.data?.message || "Failed to load course", "error");
    } finally {
      setLoading(false);
    }
  }, [courseId, currentLesson, showToast]);

  useEffect(() => {
    loadContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  const handleMarkComplete = async (lessonId) => {
    setMarking(true);
    try {
      await markComplete(lessonId);
      showToast("Lesson marked as complete", "success");
      const updated = await getCourseContent(courseId);
      setModules(updated || []);
      const flat = (updated || []).flatMap((m) => m.lessons || []);
      const refreshed = flat.find((l) => l.id === lessonId);
      if (refreshed) setCurrentLesson(refreshed);
      const detailData = await getStudentCourseDetail(courseId);
      setDetail(detailData);
    } catch (err) {
      showToast(err?.response?.data?.message || "Failed to mark as complete", "error");
    } finally {
      setMarking(false);
    }
  };

  const handleMarkAttendance = async (sessionId) => {
    setMarkingSession(sessionId);
    try {
      await markSessionAttendance(sessionId);
      showToast("Attendance marked successfully", "success");
      const detailData = await getStudentCourseDetail(courseId);
      setDetail(detailData);
    } catch (err) {
      showToast(err?.response?.data?.message || "Failed to mark attendance", "error");
    } finally {
      setMarkingSession(null);
    }
  };

  if (loading) {
    return (
      <Stack direction="row" spacing={1.2} alignItems="center">
        <CircularProgress size={20} />
        <Typography color="text.secondary">Loading course...</Typography>
      </Stack>
    );
  }

  const totalLessons = modules.reduce((sum, m) => sum + (m.lessons?.length || 0), 0);
  const completedLessons = modules.reduce(
    (sum, m) => sum + (m.lessons || []).filter((l) => l.completed).length,
    0
  );
  const progressPercent = totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100);

  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <IconButton href="/dashboard/courses" size="small">
          <ArrowBackRoundedIcon />
        </IconButton>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>
            {detail?.course?.title || "Course"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Instructor: {detail?.course?.instructor || "N/A"}
          </Typography>
        </Box>
        <Chip
          label={`${progressPercent}% complete`}
          sx={{
            fontWeight: 700,
            bgcolor: progressPercent === 100 ? "#dcfce7" : "#e0f2fe",
            color: progressPercent === 100 ? "#166534" : "#0c4a6e",
          }}
        />
      </Stack>

      <LinearProgress
        variant="determinate"
        value={progressPercent}
        sx={{
          height: 8,
          borderRadius: 999,
          bgcolor: "#e2e8f0",
          mb: 3,
          "& .MuiLinearProgress-bar": { borderRadius: 999 },
        }}
      />

      <CourseSummary
        modules={modules}
        sessions={detail?.sessions || []}
        progressPercent={progressPercent}
        currentLesson={currentLesson}
        onSelectLesson={setCurrentLesson}
      />

      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        sx={{ mb: 2.5, "& .MuiTab-root": { fontWeight: 700, textTransform: "none" } }}
      >
        <Tab label="Lessons" />
        <Tab label="Overview" />
        <Tab label="Sessions" />
      </Tabs>

      {tab === 0 && (
        <LessonsTab
          modules={modules}
          currentLesson={currentLesson}
          onSelectLesson={setCurrentLesson}
          onMarkComplete={handleMarkComplete}
          marking={marking}
        />
      )}

      {tab === 1 && <OverviewTab detail={detail} progress={{ completedLessons, totalLessons, progressPercent }} />}

      {tab === 2 && (
        <SessionsTab
          sessions={detail?.sessions || []}
          markingSession={markingSession}
          onMarkAttendance={handleMarkAttendance}
        />
      )}
    </Box>
  );
}

function LessonsTab({ modules, currentLesson, onSelectLesson, onMarkComplete, marking }) {
  return (
    <Grid container spacing={2.5}>
      <Grid size={{ xs: 12, md: 8 }}>
        <Card elevation={0} sx={cardSx}>
          <CardContent sx={{ p: 0 }}>
            {currentLesson ? (
              <>
                <Box sx={{ bgcolor: "#000", borderRadius: "12px 12px 0 0", overflow: "hidden" }}>
                  <ReactPlayer url={currentLesson.video_url} controls width="100%" height="420px" />
                </Box>
                <Box sx={{ p: 2.5 }}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                      {currentLesson.title}
                    </Typography>
                    {currentLesson.completed ? (
                      <Chip
                        icon={<CheckCircleRoundedIcon sx={{ fontSize: 18 }} />}
                        label="Completed"
                        size="small"
                        sx={{ fontWeight: 700, bgcolor: "#dcfce7", color: "#166534" }}
                      />
                    ) : (
                      <Button
                        variant="contained"
                        size="small"
                        disabled={marking}
                        onClick={() => onMarkComplete(currentLesson.id)}
                        sx={{ borderRadius: 2.5, textTransform: "none", fontWeight: 700 }}
                      >
                        {marking ? "Marking..." : "Mark Complete"}
                      </Button>
                    )}
                  </Stack>
                  {currentLesson.duration && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      Duration: {currentLesson.duration}
                    </Typography>
                  )}
                </Box>
              </>
            ) : (
              <Box sx={{ p: 4, textAlign: "center" }}>
                <Typography color="text.secondary">Select a lesson to start learning.</Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <Card elevation={0} sx={{ ...cardSx, maxHeight: "70vh", overflowY: "auto" }}>
          <CardContent sx={{ p: 1.5 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, px: 1, mb: 1 }}>
              Course Content
            </Typography>
            {modules.map((mod) => (
              <Box key={mod.module_id} sx={{ mb: 1.5 }}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 800, color: "#475569", px: 1, mb: 0.5 }}
                >
                  {mod.module_title}
                </Typography>
                <List dense disablePadding>
                  {(mod.lessons || []).map((lesson) => (
                    <ListItemButton
                      key={lesson.id}
                      selected={currentLesson?.id === lesson.id}
                      onClick={() => onSelectLesson(lesson)}
                      sx={{
                        borderRadius: 1.5,
                        mb: 0.3,
                        "&.Mui-selected": { bgcolor: "rgba(37,99,235,0.1)", color: "#1d4ed8" },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        {lesson.completed ? (
                          <CheckCircleRoundedIcon sx={{ fontSize: 20, color: "#16a34a" }} />
                        ) : currentLesson?.id === lesson.id ? (
                          <PlayCircleOutlineRoundedIcon sx={{ fontSize: 20, color: "#2563eb" }} />
                        ) : (
                          <RadioButtonUncheckedRoundedIcon sx={{ fontSize: 20, color: "#94a3b8" }} />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={lesson.title}
                        primaryTypographyProps={{ fontSize: "0.88rem", fontWeight: 600 }}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Box>
            ))}
            {modules.length === 0 && (
              <Typography variant="body2" color="text.secondary" sx={{ p: 1 }}>
                No content available yet.
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

function OverviewTab({ detail, progress }) {
  const course = detail?.course;
  const batch = detail?.batch;

  return (
    <Stack spacing={2.5}>
      <Card elevation={0} sx={cardSx}>
        <CardContent sx={{ p: { xs: 2.2, md: 3 } }}>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.4 }}>About this Course</Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            {course?.description || "No description available."}
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Typography variant="body2" color="text.secondary">Level</Typography>
              <Typography sx={{ fontWeight: 700 }}>{course?.level || "N/A"}</Typography>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Typography variant="body2" color="text.secondary">Price</Typography>
              <Typography sx={{ fontWeight: 700 }}>INR {course?.price || "Free"}</Typography>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Typography variant="body2" color="text.secondary">Instructor</Typography>
              <Typography sx={{ fontWeight: 700 }}>{course?.instructor || "N/A"}</Typography>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Typography variant="body2" color="text.secondary">Progress</Typography>
              <Typography sx={{ fontWeight: 700 }}>
                {progress.completedLessons}/{progress.totalLessons} lessons ({progress.progressPercent}%)
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {batch && (
        <Card elevation={0} sx={cardSx}>
          <CardContent sx={{ p: { xs: 2.2, md: 3 } }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.4 }}>Batch Details</Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="body2" color="text.secondary">Batch Name</Typography>
                <Typography sx={{ fontWeight: 700 }}>{batch.name}</Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="body2" color="text.secondary">Status</Typography>
                <Typography sx={{ fontWeight: 700, textTransform: "capitalize" }}>{batch.status || "N/A"}</Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="body2" color="text.secondary">Start Date</Typography>
                <Typography sx={{ fontWeight: 700 }}>
                  {batch.startDate ? new Date(batch.startDate).toLocaleDateString() : "N/A"}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="body2" color="text.secondary">End Date</Typography>
                <Typography sx={{ fontWeight: 700 }}>
                  {batch.endDate ? new Date(batch.endDate).toLocaleDateString() : "N/A"}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="body2" color="text.secondary">Schedule</Typography>
                <Typography sx={{ fontWeight: 700 }}>{batch.schedule}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      <Card elevation={0} sx={cardSx}>
        <CardContent sx={{ p: { xs: 2.2, md: 3 } }}>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.4 }}>Learning Progress</Typography>
          <LinearProgress
            variant="determinate"
            value={progress.progressPercent}
            sx={{
              height: 12,
              borderRadius: 999,
              bgcolor: "#e2e8f0",
              mb: 1.2,
              "& .MuiLinearProgress-bar": { borderRadius: 999 },
            }}
          />
          <Typography variant="body2" color="text.secondary">
            {progress.completedLessons} of {progress.totalLessons} lessons completed
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  );
}

function SessionsTab({ sessions, markingSession, onMarkAttendance }) {
  const upcoming = sessions.filter((s) => s.session_status === "scheduled" || s.session_status === "live");
  const past = sessions.filter((s) => s.session_status === "completed" || s.session_status === "cancelled");

  if (sessions.length === 0) {
    return (
      <Card elevation={0} sx={cardSx}>
        <CardContent sx={{ textAlign: "center", py: 6 }}>
          <Typography color="text.secondary">No sessions scheduled for this course yet.</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Stack spacing={2.5}>
      {upcoming.length > 0 && (
        <Card elevation={0} sx={cardSx}>
          <CardContent sx={{ p: { xs: 2.2, md: 3 } }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.4 }}>Upcoming & Live Sessions</Typography>
            <SessionTable
              rows={upcoming}
              markingSession={markingSession}
              onMarkAttendance={onMarkAttendance}
            />
          </CardContent>
        </Card>
      )}

      {past.length > 0 && (
        <Card elevation={0} sx={cardSx}>
          <CardContent sx={{ p: { xs: 2.2, md: 3 } }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.4 }}>Past Sessions</Typography>
            <SessionTable rows={past} markingSession={markingSession} onMarkAttendance={onMarkAttendance} />
          </CardContent>
        </Card>
      )}
    </Stack>
  );
}

function SessionTable({ rows, markingSession, onMarkAttendance }) {
  return (
    <TableContainer sx={{ overflowX: "auto" }}>
      <Table sx={{ minWidth: 600 }}>
        <TableHead>
          <TableRow>
            <TableCell><strong>Date</strong></TableCell>
            <TableCell><strong>Session</strong></TableCell>
            <TableCell><strong>Duration</strong></TableCell>
            <TableCell><strong>Status</strong></TableCell>
            <TableCell><strong>Action</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((s) => {
            const sc = sessionStatusColors[s.session_status] || sessionStatusColors.scheduled;
            return (
              <TableRow key={s.session_id} hover>
                <TableCell>{new Date(s.scheduled_at).toLocaleDateString()}</TableCell>
                <TableCell>{s.session_title}</TableCell>
                <TableCell>{s.duration_minutes} min</TableCell>
                <TableCell>
                  <Chip
                    label={s.session_status}
                    size="small"
                    sx={{ fontWeight: 700, bgcolor: sc.bg, color: sc.color, textTransform: "capitalize" }}
                  />
                </TableCell>
                <TableCell>
                  {s.session_status === "live" && !s.attended ? (
                    <Button
                      size="small"
                      variant="contained"
                      disabled={markingSession === s.session_id}
                      onClick={() => onMarkAttendance(s.session_id)}
                      sx={{ textTransform: "none", borderRadius: 2, fontWeight: 700 }}
                    >
                      {markingSession === s.session_id ? "Marking..." : "Mark Present"}
                    </Button>
                  ) : s.attended ? (
                    <Chip label="Attended" size="small" sx={{ fontWeight: 700, bgcolor: "#dcfce7", color: "#166534" }} />
                  ) : (
                    <Typography variant="body2" color="text.secondary">—</Typography>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function CourseSummary({ modules, sessions, progressPercent, currentLesson, onSelectLesson }) {
  const totalModules = modules.length;
  const totalLessons = modules.reduce((sum, m) => sum + (m.lessons?.length || 0), 0);

  // Find next incomplete lesson
  let nextLesson = null;
  for (const mod of modules) {
    const found = mod.lessons?.find(l => !l.completed);
    if (found) {
      nextLesson = found;
      break;
    }
  }

  const liveSession = sessions.find(s => s.session_status === "live");
  const upcomingSession = sessions.find(s => s.session_status === "scheduled" && new Date(s.scheduled_at) > new Date());

  return (
    <Card elevation={0} sx={{ ...cardSx, mb: 3, bgcolor: "#f8fafc" }}>
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Course At a Glance</Typography>
        <TableContainer sx={{ bgcolor: "white", borderRadius: 2, border: "1px solid #e2e8f0" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#f1f5f9" }}>
                <TableCell sx={{ fontWeight: 700 }}>Content</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Live Sessions</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Next Up</TableCell>
                <TableCell sx={{ fontWeight: 700, textAlign: "right" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{totalModules} Modules</Typography>
                  <Typography variant="caption" color="text.secondary">{totalLessons} Lessons</Typography>
                </TableCell>
                <TableCell>
                  {liveSession ? (
                    <Box>
                      <Chip label="Live Now" color="success" size="small" sx={{ fontWeight: 700, mb: 0.5 }} />
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{liveSession.session_title}</Typography>
                      <Button
                        size="small"
                        href={liveSession.join_url}
                        target="_blank"
                        sx={{ mt: 0.5, textTransform: "none" }}
                      >
                        Join Now
                      </Button>
                    </Box>
                  ) : upcomingSession ? (
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{upcomingSession.session_title}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(upcomingSession.scheduled_at).toLocaleString()}
                      </Typography>
                    </Box>
                  ) : (
                    <Typography variant="body2" color="text.secondary">No upcoming sessions</Typography>
                  )}
                </TableCell>
                <TableCell>
                  {nextLesson ? (
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{nextLesson.title}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {nextLesson.duration || "Duration N/A"}
                      </Typography>
                    </Box>
                  ) : (
                    <Typography variant="body2" color="text.success">Course Completed!</Typography>
                  )}
                </TableCell>
                <TableCell align="right">
                  {nextLesson ? (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => onSelectLesson(nextLesson)}
                      sx={{ textTransform: "none", borderRadius: 2, fontWeight: 700 }}
                    >
                      Continue
                    </Button>
                  ) : (
                    <Chip label="Completed" color="success" size="small" />
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
