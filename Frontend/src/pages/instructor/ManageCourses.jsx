import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  FormControlLabel,
  Grid,
  Stack,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import useToast from "../../hooks/useToast";
import { createInstructorCourse, getInstructorCourses, toggleInstructorCourseActive } from "../../services/instructorService";

const initialForm = {
  title: "",
  description: "",
  level: "Beginner",
  price: "",
};

const statusStyles = {
  approved: { bg: "#dcfce7", color: "#166534", label: "Approved" },
  pending: { bg: "#fef3c7", color: "#92400e", label: "Pending" },
  rejected: { bg: "#fee2e2", color: "#991b1b", label: "Rejected" },
};

export default function ManageCourses() {
  const { showToast } = useToast();
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const loadCourses = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getInstructorCourses();
      setCourses(Array.isArray(data) ? data : []);
    } catch (requestError) {
      const errorMessage = requestError?.response?.data?.message || "Failed to load courses";
      setError(errorMessage);
      showToast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim() || !formData.price) {
      showToast("Title, description and price are required", "error");
      return;
    }

    try {
      setSubmitting(true);
      await createInstructorCourse({
        title: formData.title.trim(),
        description: formData.description.trim(),
        level: formData.level,
        price: Number(formData.price),
      });
      showToast("Course created and sent for admin approval", "success");
      setFormData(initialForm);
      await loadCourses();
    } catch (requestError) {
      showToast(requestError?.response?.data?.message || "Failed to create course", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleActive = async (courseId, currentStatus) => {
    const newStatus = !currentStatus;

    try {
      await toggleInstructorCourseActive(courseId, newStatus);
      showToast(`Course ${newStatus ? 'activated' : 'deactivated'} successfully`, "success");
      await loadCourses();
    } catch (requestError) {
      showToast(requestError?.response?.data?.message || "Failed to update course status", "error");
    }
  };

  return (
    <Box>
      <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} sx={{ mb: 2 }} spacing={1}>
        <Box>
          <Typography variant="h4" sx={{ mb: 0.5 }}>Manage Courses</Typography>
          <Typography color="text.secondary">Create, edit, and organize your curriculum and materials.</Typography>
        </Box>
      </Stack>

      {error ? <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert> : null}

      <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0", mb: 2.2 }}>
        <CardContent sx={{ p: { xs: 2.2, md: 3 } }}>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5 }}>
            Create New Course
          </Typography>

          <Stack component="form" spacing={1.5} onSubmit={handleCreateCourse}>
            <TextField
              label="Course Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
            />
            <Grid container spacing={1.5}>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  select
                  label="Level"
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  fullWidth
                  SelectProps={{ native: true }}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  label="Price (INR)"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              disabled={submitting || loading}
              sx={{ borderRadius: 2.5, alignSelf: "flex-start" }}
            >
              {submitting ? "Creating..." : "Create New Course"}
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Stack spacing={1.6}>
        {loading ? (
          <Typography color="text.secondary">Loading courses...</Typography>
        ) : courses.length === 0 ? (
          <Alert severity="info">No courses found. Create your first course above.</Alert>
        ) : (
          courses.map((course, index) => {
            const statusKey = (course.approval_status || "pending").toLowerCase();
            const style = statusStyles[statusKey] || statusStyles.pending;

            return (
              <Card key={course.id} elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0" }}>
                <CardContent sx={{ p: 2.4 }}>
                  <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" spacing={1.5}>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5 }}>#{index + 1} {course.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Level: {course.level || "N/A"} | Price: INR {course.price} | Created{" "}
                        {course.created_at ? new Date(course.created_at).toLocaleDateString() : "N/A"}
                      </Typography>
                    </Box>

                    <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap" useFlexGap>
                      <Chip
                        label={style.label}
                        size="small"
                        sx={{ fontWeight: 700, bgcolor: style.bg, color: style.color }}
                      />
                      <Chip
                        label={course.is_active ? "Active" : "Inactive"}
                        size="small"
                        sx={{
                          fontWeight: 700,
                          bgcolor: course.is_active ? "#dcfce7" : "#f3f4f6",
                          color: course.is_active ? "#166534" : "#6b7280"
                        }}
                      />
                      <Tooltip
                        title={
                          statusKey === "approved"
                            ? "Toggle to activate/deactivate this course"
                            : "Only approved courses can be activated"
                        }
                      >
                        <span>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={course.is_active || false}
                                onChange={() => handleToggleActive(course.id, course.is_active)}
                                disabled={statusKey !== "approved"}
                                size="small"
                              />
                            }
                            label=""
                            sx={{ m: 0 }}
                          />
                        </span>
                      </Tooltip>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            );
          })
        )}
      </Stack>
    </Box>
  );
}
