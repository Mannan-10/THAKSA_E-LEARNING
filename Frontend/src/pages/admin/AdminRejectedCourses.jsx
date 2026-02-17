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

const toArray = (payload) => (Array.isArray(payload) ? payload : payload?.courses || payload?.data || []);

export const AdminRejectedCourses = () => {
  const { showToast } = useToast();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
                        onClick={async () => {
                          if (!window.confirm("Approve this course?")) return;
                          try {
                            await approveCourse(course.id);
                            setCourses((prev) => prev.filter((c) => c.id !== course.id));
                            showToast("Course approved successfully.", "success");
                          } catch (err) {
                            showToast(err?.response?.data?.message || "Failed to approve", "error");
                          }
                        }}
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
    </Card>
  );
};
