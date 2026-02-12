import React, { useEffect, useState } from "react";
import { getInstructorStats } from "../../services/instructorService.js";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  CircularProgress,
} from "@mui/material";

export default function InstructorDashboard() {
  const [stats, setStats] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  },[]);

  const fetchStats = async () => {
    try {
      const data = await getInstructorStats();
      console.log("Instructor stats fetched:", data);
      setStats(data.stats);
      setCourses(data.courseStats)
    } catch (error) {
      console.log("Error on fetching stats for Instructor",error);      
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!stats) {
    return <Typography variant="h6">No data available.</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: "#0f172a" }}>
          Instructor Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: "#64748b", mt: 1 }}>
          Welcome back! Here's an overview of your performance.
        </Typography>
      </Box>

      {/* STATS */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
        <Grid item xs={12} sm={4}>
          <StatCard label="Total Courses" value={stats.totalCourses} color="#2563eb" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard label="Total Students" value={stats.totalStudents} color="#16a34a" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard
            label="Total Revenue"
            value={`₹ ${Number(stats.totalRevenue).toLocaleString()}`}
            color="#f59e0b"
          />
        </Grid>
      </Grid>

      {/* COURSE PERFORMANCE */}
      <Card variant="outlined" sx={{ borderRadius: "16px" }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
            Course Performance
          </Typography>

          {courses.length === 0 ? (
            <Typography sx={{ color: "#64748b" }}>No courses found</Typography>
          ) : (
            <TableContainer>
              <Table>
                <TableHead sx={{ bgcolor: "#f8fafc" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, color: "#475569" }}>Course</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#475569" }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#475569" }}>Enrollments</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#475569" }}>Rating</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {courses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>{course.title}</TableCell>
                      <TableCell>
                        <Chip
                          label={course.approval_status}
                          size="small"
                          sx={{
                            fontWeight: 600,
                            bgcolor: course.approval_status === "approved" ? "#dcfce7" : "#fee2e2",
                            color: course.approval_status === "approved" ? "#166534" : "#991b1b",
                          }}
                        />
                      </TableCell>
                      <TableCell>{course.enrollment_count}</TableCell>
                      <TableCell>⭐ {Number(course.avg_rating).toFixed(1)}</TableCell>
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

const StatCard = ({ label, value, color }) => {
  return (
    <Card variant="outlined" sx={{ p: 3, borderRadius: "16px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
      <Typography variant="h4" sx={{ fontWeight: 800, color }}>
        {value}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 600, color: "#64748b" }}>
        {label}
      </Typography>
    </Card>
  );
};
