import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { approveCourse, getPendingCourses, rejectCourse } from "../../services/adminServices";

const toArray = (payload) => (Array.isArray(payload) ? payload : payload?.courses || payload?.data || []);

export const AdminPendingCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getPendingCourses();
      setCourses(toArray(data));
    } catch (requestError) {
      setError(requestError?.response?.data?.message || "Error fetching pending courses");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    if (!window.confirm("Approve this course?")) return;
    try {
      await approveCourse(id);
      setCourses((prev) => prev.filter((c) => c.id !== id));
    } catch {
      setError("Failed to approve course");
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm("Reject this course?")) return;
    try {
      await rejectCourse(id);
      setCourses((prev) => prev.filter((c) => c.id !== id));
    } catch {
      setError("Failed to reject course");
    }
  };

  const noData = useMemo(() => !loading && courses.length === 0, [loading, courses]);

  return (
    <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0" }}>
      <CardContent sx={{ p: 2.2 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.2 }}>Pending Approvals</Typography>
        {error ? <Alert severity="error" sx={{ mb: 1.5 }}>{error}</Alert> : null}

        {loading ? (
          <Stack direction="row" alignItems="center" spacing={1.2} sx={{ py: 1 }}>
            <CircularProgress size={20} />
            <Typography color="text.secondary">Loading pending courses...</Typography>
          </Stack>
        ) : noData ? (
          <Alert severity="info">No pending courses found.</Alert>
        ) : (
          <TableContainer sx={{ overflowX: "auto" }}>
            <Table size="small" sx={{ minWidth: 760 }}>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Title</strong></TableCell>
                  <TableCell><strong>Instructor</strong></TableCell>
                  <TableCell><strong>Category</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell align="right"><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courses.map((course) => (
                  <TableRow key={course.id} hover>
                    <TableCell>{course.title}</TableCell>
                    <TableCell>{course.instructor_name}</TableCell>
                    <TableCell>{course.category || "-"}</TableCell>
                    <TableCell>
                      <Chip label={course.approval_status || "pending"} size="small" sx={{ bgcolor: "#fef3c7", color: "#92400e", fontWeight: 700 }} />
                    </TableCell>
                    <TableCell align="right">
                      <Button size="small" color="success" onClick={() => handleApprove(course.id)} sx={{ mr: 1 }}>
                        Approve
                      </Button>
                      <Button size="small" color="error" onClick={() => handleReject(course.id)}>
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
    </Card>
  );
};
