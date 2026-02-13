import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { getInstructorStats } from "../../services/instructorService.js";

const statMeta = [
  { key: "totalCourses", label: "Total Courses", color: "#2563eb", icon: <MenuBookIcon fontSize="small" /> },
  { key: "totalStudents", label: "Total Students", color: "#16a34a", icon: <PeopleIcon fontSize="small" /> },
  { key: "totalRevenue", label: "Total Revenue", color: "#f59e0b", icon: <AttachMoneyIcon fontSize="small" /> },
];

export default function InstructorDashboard() {
  const [stats, setStats] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const fetchStats = useCallback(async (isBackgroundRefresh = false) => {
    try {
      if (isBackgroundRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError("");
      const data = await getInstructorStats();
      setStats(data?.stats || null);
      setCourses(data?.courseStats || []);
    } catch (requestError) {
      setError(requestError?.response?.data?.message || "Failed to load instructor dashboard");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
    const intervalId = setInterval(() => fetchStats(true), 20000);
    const onFocus = () => fetchStats(true);
    window.addEventListener("focus", onFocus);
    return () => {
      clearInterval(intervalId);
      window.removeEventListener("focus", onFocus);
    };
  }, [fetchStats]);

  const normalizedStats = useMemo(() => ({
    totalCourses: Number(stats?.totalCourses || 0),
    totalStudents: Number(stats?.totalStudents || 0),
    totalRevenue: Number(stats?.totalRevenue || 0),
  }), [stats]);

  if (loading) {
    return (
      <Stack direction="row" spacing={1.2} alignItems="center">
        <CircularProgress size={20} />
        <Typography color="text.secondary">Loading dashboard...</Typography>
      </Stack>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 0.6 }}>Instructor Dashboard</Typography>
      <Typography color="text.secondary" sx={{ mb: 3.2 }}>
        Overview of your courses, students, and performance.
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1.4 }}>
        <Button size="small" variant="outlined" onClick={() => fetchStats(true)} disabled={refreshing}>
          {refreshing ? "Refreshing..." : "Refresh"}
        </Button>
      </Box>

      {error ? <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert> : null}

      <Grid container spacing={2.2} sx={{ mb: 3.2 }}>
        {statMeta.map((item) => (
          <Grid key={item.key} size={{ xs: 12, sm: 6, lg: 4 }}>
            <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0" }}>
              <CardContent sx={{ p: 2.4 }}>
                <Stack direction="row" justifyContent="space-between" spacing={1}>
                  <Box>
                    <Typography color="text.secondary" variant="body2" sx={{ mb: 0.8 }}>{item.label}</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 900, color: item.color }}>
                      {item.key === "totalRevenue"
                        ? `INR ${normalizedStats[item.key].toLocaleString()}`
                        : normalizedStats[item.key].toLocaleString()}
                    </Typography>
                  </Box>
                  <Box sx={{ color: item.color }}>{item.icon}</Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0" }}>
        <CardContent sx={{ p: 2.2 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.2 }}>Course Performance</Typography>

          {courses.length === 0 ? (
            <Alert severity="info">No courses found.</Alert>
          ) : (
            <TableContainer sx={{ overflowX: "auto" }}>
              <Table sx={{ minWidth: 700 }}>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Course</strong></TableCell>
                    <TableCell><strong>Status</strong></TableCell>
                    <TableCell><strong>Enrollments</strong></TableCell>
                    <TableCell><strong>Rating</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {courses.map((course) => (
                    <TableRow key={course.id} hover>
                      <TableCell>{course.title}</TableCell>
                      <TableCell>
                        <Chip
                          label={course.approval_status || "pending"}
                          size="small"
                          sx={{
                            fontWeight: 700,
                            bgcolor: course.approval_status === "approved" ? "#dcfce7" : "#fee2e2",
                            color: course.approval_status === "approved" ? "#166534" : "#991b1b",
                          }}
                        />
                      </TableCell>
                      <TableCell>{Number(course.enrollment_count || 0)}</TableCell>
                      <TableCell>{Number(course.avg_rating || 0).toFixed(1)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
