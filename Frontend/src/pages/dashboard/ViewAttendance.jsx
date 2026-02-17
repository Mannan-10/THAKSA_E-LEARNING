import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
} from "@mui/material";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { getMyAttendance, markSessionAttendance } from "../../services/userServices";

const statusColors = {
  Present: { bg: "#dcfce7", color: "#166534" },
  Absent: { bg: "#fee2e2", color: "#991b1b" },
  Upcoming: { bg: "#e0f2fe", color: "#0c4a6e" },
  Cancelled: { bg: "#f1f5f9", color: "#64748b" },
};

export default function ViewAttendance() {
  const [records, setRecords] = useState([]);
  const [stats, setStats] = useState({ totalSessions: 0, completedSessions: 0, present: 0, absent: 0, attendanceRate: 0 });
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState(null);
  const [courseFilter, setCourseFilter] = useState("all");

  const fetchAttendance = async () => {
    try {
      const data = await getMyAttendance();
      setRecords(data.records);
      setStats(data.stats);
    } catch (err) {
      console.error("Failed to fetch attendance", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleMarkAttendance = async (sessionId) => {
    setMarking(sessionId);
    try {
      await markSessionAttendance(sessionId);
      await fetchAttendance();
    } catch (err) {
      console.error("Failed to mark attendance", err);
    } finally {
      setMarking(null);
    }
  };

  const courses = [...new Map(records.map((r) => [r.course_id, r.course_title])).entries()];
  const filteredRecords = courseFilter === "all" ? records : records.filter((r) => r.course_id === courseFilter);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 0.6 }}>Attendance</Typography>
      <Typography color="text.secondary" sx={{ mb: 3.2 }}>
        Track your session attendance and participation.
      </Typography>

      <Grid container spacing={2.2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 3 }}>
          <Card elevation={0} sx={cardSx}>
            <CardContent sx={{ p: 2.4 }}>
              <Typography color="text.secondary" variant="body2" sx={{ mb: 0.8 }}>Total Sessions</Typography>
              <Typography variant="h5" sx={{ fontWeight: 900, color: "#2563eb" }}>{stats.totalSessions}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 3 }}>
          <Card elevation={0} sx={cardSx}>
            <CardContent sx={{ p: 2.4 }}>
              <Typography color="text.secondary" variant="body2" sx={{ mb: 0.8 }}>Sessions Attended</Typography>
              <Typography variant="h5" sx={{ fontWeight: 900, color: "#16a34a" }}>{stats.present}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 3 }}>
          <Card elevation={0} sx={cardSx}>
            <CardContent sx={{ p: 2.4 }}>
              <Typography color="text.secondary" variant="body2" sx={{ mb: 0.8 }}>Sessions Missed</Typography>
              <Typography variant="h5" sx={{ fontWeight: 900, color: "#dc2626" }}>{stats.absent}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 3 }}>
          <Card elevation={0} sx={cardSx}>
            <CardContent sx={{ p: 2.4 }}>
              <Typography color="text.secondary" variant="body2" sx={{ mb: 0.8 }}>Attendance Rate</Typography>
              <Typography variant="h5" sx={{ fontWeight: 900, color: "#9333ea" }}>{stats.attendanceRate}%</Typography>
              <LinearProgress
                variant="determinate"
                value={stats.attendanceRate}
                sx={{ mt: 1, height: 8, borderRadius: 999, bgcolor: "#e2e8f0", "& .MuiLinearProgress-bar": { borderRadius: 999 } }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>Session Records</Typography>
        {courses.length > 1 && (
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Filter by Course</InputLabel>
            <Select
              value={courseFilter}
              label="Filter by Course"
              onChange={(e) => setCourseFilter(e.target.value)}
            >
              <MenuItem value="all">All Courses</MenuItem>
              {courses.map(([id, title]) => (
                <MenuItem key={id} value={id}>{title}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Stack>

      {filteredRecords.length === 0 ? (
        <Card elevation={0} sx={cardSx}>
          <CardContent sx={{ textAlign: "center", py: 6 }}>
            <Typography color="text.secondary">No sessions found. Attendance records will appear here once your batch has live sessions.</Typography>
          </CardContent>
        </Card>
      ) : (
        <Card elevation={0} sx={cardSx}>
          <CardContent sx={{ p: 0 }}>
            <TableContainer sx={{ overflowX: "auto" }}>
              <Table sx={{ minWidth: 700 }}>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Date</strong></TableCell>
                    <TableCell><strong>Session</strong></TableCell>
                    <TableCell><strong>Course</strong></TableCell>
                    <TableCell><strong>Status</strong></TableCell>
                    <TableCell><strong>Action</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRecords.map((row) => {
                    const colors = statusColors[row.attendance_status] || statusColors.Upcoming;
                    return (
                      <TableRow key={row.session_id} hover>
                        <TableCell>{new Date(row.scheduled_at).toLocaleDateString()}</TableCell>
                        <TableCell>{row.session_title}</TableCell>
                        <TableCell>{row.course_title}</TableCell>
                        <TableCell>
                          <Chip
                            label={row.attendance_status}
                            size="small"
                            sx={{ fontWeight: 700, bgcolor: colors.bg, color: colors.color }}
                          />
                        </TableCell>
                        <TableCell>
                          {row.session_status === "live" && row.attendance_status !== "Present" ? (
                            <Button
                              size="small"
                              variant="contained"
                              startIcon={<CheckCircleOutlineRoundedIcon />}
                              disabled={marking === row.session_id}
                              onClick={() => handleMarkAttendance(row.session_id)}
                              sx={{ textTransform: "none", borderRadius: 2, fontWeight: 700 }}
                            >
                              {marking === row.session_id ? "Marking..." : "Mark Present"}
                            </Button>
                          ) : row.attendance_status === "Present" ? (
                            <Typography variant="body2" color="text.secondary">
                              Marked at {new Date(row.marked_at).toLocaleTimeString()}
                            </Typography>
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
          </CardContent>
        </Card>
      )}
    </Box>
  );
}

const cardSx = {
  borderRadius: 3,
  border: "1px solid #e2e8f0",
  boxShadow: "0 14px 26px rgba(15,23,42,0.05)",
};
