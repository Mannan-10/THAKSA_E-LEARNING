import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import useToast from "../../hooks/useToast";
import {
  getBatchStudents,
  getInstructorBatches,
  getInstructorCourses,
  removeStudentFromBatch,
} from "../../services/instructorService";

export default function MyStudents() {
  const { showToast } = useToast();
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [students, setStudents] = useState([]);
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [profileDialog, setProfileDialog] = useState(null);

  useEffect(() => {
    let active = true;
    const loadData = async () => {
      try {
        const [courseData, batchData] = await Promise.all([
          getInstructorCourses(),
          getInstructorBatches(),
        ]);
        if (!active) return;
        setCourses(Array.isArray(courseData) ? courseData : []);
        setBatches(Array.isArray(batchData) ? batchData : []);
      } catch {
        showToast("Failed to load data", "error");
      } finally {
        if (active) setLoading(false);
      }
    };
    loadData();
    return () => { active = false; };
  }, [showToast]);

  const loadStudents = useCallback(async (batchId) => {
    setSelectedBatch(batchId);
    setStudentsLoading(true);
    try {
      const data = await getBatchStudents(batchId);
      setStudents(data?.students || []);
    } catch (err) {
      showToast(err?.response?.data?.message || "Failed to load students", "error");
      setStudents([]);
    } finally {
      setStudentsLoading(false);
    }
  }, [showToast]);

  const handleRemove = async (studentId) => {
    if (!window.confirm("Remove this student from the batch?")) return;
    try {
      await removeStudentFromBatch(selectedBatch, studentId);
      showToast("Student removed from batch", "success");
      await loadStudents(selectedBatch);
    } catch (err) {
      showToast(err?.response?.data?.message || "Failed to remove student", "error");
    }
  };

  if (loading) {
    return (
      <Stack direction="row" spacing={1.2} alignItems="center">
        <CircularProgress size={20} />
        <Typography color="text.secondary">Loading...</Typography>
      </Stack>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 0.6 }}>Students</Typography>
      <Typography color="text.secondary" sx={{ mb: 2.2 }}>
        View and manage students across your courses and batches.
      </Typography>

      {courses.length === 0 ? (
        <Alert severity="info">No courses found.</Alert>
      ) : (
        <Stack spacing={2.2}>
          {courses.map((course) => {
            const courseBatches = batches.filter((b) => b.course_id === course.id);
            return (
              <Card key={course.id} elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0" }}>
                <CardContent sx={{ p: { xs: 2.2, md: 3 } }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>{course.title}</Typography>

                  {courseBatches.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">No batches for this course.</Typography>
                  ) : (
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      {courseBatches.map((batch) => (
                        <Chip
                          key={batch.id}
                          label={batch.batch_name || `Batch ${batch.id}`}
                          onClick={() => loadStudents(batch.id)}
                          variant={selectedBatch === batch.id ? "filled" : "outlined"}
                          color={selectedBatch === batch.id ? "primary" : "default"}
                          sx={{ fontWeight: 700, cursor: "pointer" }}
                        />
                      ))}
                    </Stack>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </Stack>
      )}

      {selectedBatch && (
        <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0", mt: 3 }}>
          <CardContent sx={{ p: { xs: 2.2, md: 3 } }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.4 }}>
              Students in Batch
            </Typography>

            {studentsLoading ? (
              <Stack direction="row" spacing={1.2} alignItems="center">
                <CircularProgress size={20} />
                <Typography color="text.secondary">Loading students...</Typography>
              </Stack>
            ) : students.length === 0 ? (
              <Alert severity="info">No students enrolled in this batch.</Alert>
            ) : (
              <TableContainer sx={{ overflowX: "auto" }}>
                <Table sx={{ minWidth: 760 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Name</strong></TableCell>
                      <TableCell><strong>Email</strong></TableCell>
                      <TableCell><strong>Attendance</strong></TableCell>
                      <TableCell><strong>Performance</strong></TableCell>
                      <TableCell align="right"><strong>Actions</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id} hover>
                        <TableCell>
                          <Typography sx={{ fontWeight: 700 }}>{student.name}</Typography>
                        </TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>—</TableCell>
                        <TableCell>—</TableCell>
                        <TableCell align="right">
                          <Stack direction="row" spacing={1} justifyContent="flex-end">
                            <Button size="small" variant="outlined" onClick={() => setProfileDialog(student)}>
                              View Profile
                            </Button>
                            <Button size="small" variant="outlined" color="error" onClick={() => handleRemove(student.id)}>
                              Remove
                            </Button>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>
      )}

      <Dialog open={Boolean(profileDialog)} onClose={() => setProfileDialog(null)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>Student Profile</DialogTitle>
        <DialogContent>
          {profileDialog && (
            <Stack spacing={1.2} sx={{ pt: 1 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">ID</Typography>
                <Typography sx={{ fontWeight: 700 }}>{profileDialog.id}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Name</Typography>
                <Typography sx={{ fontWeight: 700 }}>{profileDialog.name}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Email</Typography>
                <Typography sx={{ fontWeight: 700 }}>{profileDialog.email}</Typography>
              </Box>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setProfileDialog(null)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
