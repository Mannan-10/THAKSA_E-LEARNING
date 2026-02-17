import { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, CircularProgress, Grid, LinearProgress, Stack, Typography } from "@mui/material";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import { getUserDashboard, getStudentSessions, markSessionAttendance } from "../../services/userServices";
import useToast from "../../hooks/useToast";

export default function UserDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState([]);
  const [marking, setMarking] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    let active = true;
    const loadDashboard = async () => {
      try {
        const [dashboardData, sessionsData] = await Promise.all([
          getUserDashboard(),
          getStudentSessions(),
        ]);
        if (active) {
          setData(dashboardData);
          setSessions(sessionsData);
        }
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        if (active) setLoading(false);
      }
    };
    loadDashboard();
    return () => { active = false; };
  }, []);

  if (loading) {
    return (
      <Stack direction="row" spacing={1.2} alignItems="center">
        <CircularProgress size={20} />
        <Typography color="text.secondary">Loading dashboard...</Typography>
      </Stack>
    );
  }

  const stats = data?.stats || {};
  const courses = data?.enrolledCourses || [];
  const currentCourse = courses.find((c) => c.progress < 100) || courses[0];

  const statCards = [
    { title: "Enrolled Courses", value: stats.totalEnrolled || 0, icon: <MenuBookRoundedIcon sx={{ color: "#1d4ed8" }} /> },
    { title: "Completed", value: stats.completedCourses || 0, icon: <CheckCircleRoundedIcon sx={{ color: "#16a34a" }} /> },
    { title: "In Progress", value: stats.ongoingCourses || 0, icon: <BarChartRoundedIcon sx={{ color: "#9333ea" }} /> },
    { title: "Upcoming Sessions", value: stats.upcomingSessions || 0, icon: <EventAvailableRoundedIcon sx={{ color: "#ea580c" }} /> },
  ];

  const handleMarkAttendance = async (sessionId) => {
    setMarking(sessionId);
    try {
      await markSessionAttendance(sessionId);
      showToast("Attendance marked successfully", "success");
      const sessionsData = await getStudentSessions();
      setSessions(sessionsData);
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to mark attendance", "error");
    } finally {
      setMarking(null);
    }
  };

  const liveSessions = sessions.filter((s) => s.status === "live");

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 0.6 }}>
        Welcome back
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3.2 }}>
        Continue your learning journey with Thaksa.
      </Typography>


      {liveSessions.length > 0 && (
        <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0", mb: 3.2, bgcolor: "#eff6ff" }}>
          <CardContent sx={{ p: { xs: 2.2, md: 3 } }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5, color: "#1e40af" }}>
              Live Now!
            </Typography>
            <Stack spacing={2}>
              {liveSessions.map((session) => (
                <Stack
                  key={session.id}
                  direction={{ xs: "column", sm: "row" }}
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}
                  sx={{ bgcolor: "white", p: 2, borderRadius: 2, border: "1px solid #bfdbfe" }}
                >
                  <Box>
                    <Typography sx={{ fontWeight: 700, color: "#1e3a8a" }}>{session.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {session.course_title} • {session.instructor_name}
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleMarkAttendance(session.id)}
                      disabled={session.is_present || marking === session.id}
                      sx={{ textTransform: "none", borderRadius: 2, fontWeight: 700 }}
                    >
                      {session.is_present ? "Present" : marking === session.id ? "Marking..." : "Mark Attendance"}
                    </Button>
                    <Button
                      variant="outlined"
                      href={session.join_url}
                      target="_blank"
                      sx={{ textTransform: "none", borderRadius: 2 }}
                    >
                      Join
                    </Button>
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </CardContent>
        </Card>
      )}

      <Grid container spacing={2.2} sx={{ mb: 3.2 }}>
        {statCards.map((stat) => (
          <Grid key={stat.title} size={{ xs: 12, sm: 6, lg: 3 }}>
            <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0", height: "100%" }}>
              <CardContent sx={{ p: 2.4 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
                  <Box>
                    <Typography color="text.secondary" variant="body2" sx={{ mb: 0.8 }}>
                      {stat.title}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 900, color: "#0f172a" }}>
                      {stat.value}
                    </Typography>
                  </Box>
                  {stat.icon}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {currentCourse ? (
        <Card
          elevation={0}
          sx={{
            borderRadius: 3,
            border: "1px solid #e2e8f0",
            boxShadow: "0 16px 28px rgba(15,23,42,0.06)",
          }}
        >
          <CardContent sx={{ p: { xs: 2.2, md: 3 } }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.8 }}>
              Currently Learning
            </Typography>
            <Typography sx={{ fontWeight: 700, color: "#0f172a", mb: 0.4 }}>
              {currentCourse.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.8 }}>
              Instructor: {currentCourse.instructor || "N/A"}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={currentCourse.progress || 0}
              sx={{ height: 10, borderRadius: 999, bgcolor: "#e2e8f0", "& .MuiLinearProgress-bar": { borderRadius: 999 } }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Progress: {currentCourse.progress || 0}%
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0" }}>
          <CardContent sx={{ p: 3 }}>
            <Typography color="text.secondary">No courses enrolled yet. Explore courses to get started!</Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
