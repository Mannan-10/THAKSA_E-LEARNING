import { useEffect, useMemo, useState } from "react";
import {
  Alert,
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
import { approveCourse, getRejectedCourses } from "../../services/adminServices";
import useToast from "../../hooks/useToast";
import ConfirmDialog from "../../components/ConfirmDialog";

const toArray = (payload) => (Array.isArray(payload) ? payload : payload?.courses || payload?.data || []);

export const AdminRejectedCourses = () => {
  const { showToast } = useToast();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [confirmCourseId, setConfirmCourseId] = useState(null);

  useEffect(() => {
    fetchRejected();
  }, []);

  const fetchRejected = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getRejectedCourses();
      setCourses(toArray(data));
    } catch (requestError) {
      setError(requestError?.response?.data?.message || "Error fetching rejected courses");
    } finally {
      setLoading(false);
    }
  };

  const noData = useMemo(() => !loading && courses.length === 0, [loading, courses]);

  const handleApprove = async () => {
    if (!confirmCourseId) return;
    const courseId = confirmCourseId;
    setConfirmCourseId(null);
    try {
      await approveCourse(courseId);
      setCourses((prev) => prev.filter((c) => c.id !== courseId));
      showToast("Course approved successfully.", "success");
    } catch (err) {
      showToast(err?.response?.data?.message || "Failed to approve", "error");
    }
  };

  return (
    <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0" }}>
      <CardContent sx={{ p: 2.2 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.2 }}>Rejected Courses</Typography>
        {error ? <Alert severity="error" sx={{ mb: 1.5 }}>{error}</Alert> : null}

        {loading ? (
          <Stack direction="row" alignItems="center" spacing={1.2} sx={{ py: 1 }}>
            <CircularProgress size={20} />
            <Typography color="text.secondary">Loading rejected courses...</Typography>
          </Stack>
        ) : noData ? (
          <Alert severity="info">No rejected courses found.</Alert>
        ) : (
          <TableContainer sx={{ overflowX: "auto" }}>
            <Table size="small" sx={{ minWidth: 620 }}>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Title</strong></TableCell>
                  <TableCell><strong>Instructor</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell align="right"><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courses.map((course) => (
                  <TableRow key={course.id} hover>
                    <TableCell>{course.title}</TableCell>
                    <TableCell>{course.instructor_name}</TableCell>
                    <TableCell>
                      <Chip label="Rejected" size="small" sx={{ bgcolor: "#fee2e2", color: "#991b1b", fontWeight: 700 }} />
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        size="small"
                        color="success"
                        onClick={() => setConfirmCourseId(course.id)}
                      >
                        Approve
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
      <ConfirmDialog
        open={Boolean(confirmCourseId)}
        onClose={() => setConfirmCourseId(null)}
        onConfirm={handleApprove}
        title="Approve Course"
        description="Are you sure you want to approve this course?"
        confirmText="Approve"
        confirmColor="success"
      />
    </Card>
  );
};
