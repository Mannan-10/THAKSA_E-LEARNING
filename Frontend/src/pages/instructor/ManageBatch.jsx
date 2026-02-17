import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import useToast from "../../hooks/useToast";
import {
  cancelInstructorSession,
  createInstructorBatch,
  createInstructorSession,
  getInstructorCourses,
  endInstructorSession,
  getInstructorBatches,
  getInstructorSessions,
  startInstructorSession,
} from "../../services/instructorService";

const initialBatchForm = {
  courseId: "",
  batch_name: "",
  start_date: "",
  end_date: "",
  schedule: "",
  max_students: "",
  status: "upcoming",
  timezone: "Asia/Kolkata",
  days_of_week: "",
  session_time: "",
  enrollment_deadline: "",
};

const initialForm = {
  batchId: "",
  title: "",
  description: "",
  scheduled_at: "",
  duration_minutes: 60,
  join_url: "",
  host_url: "",
};

export default function ManageBatch() {
  const { showToast } = useToast();
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [batchSubmitting, setBatchSubmitting] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [batchFormData, setBatchFormData] = useState(initialBatchForm);
  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState("");

  const batchOptions = useMemo(
    () =>
      batches.map((batch) => ({
        id: batch.id,
        label: `${batch.batch_name || `Batch ${batch.id}`} (Course ID: ${batch.course_id})`,
      })),
    [batches]
  );

  const courseOptions = useMemo(
    () =>
      courses.map((course) => ({
        id: course.id,
        label: course.title,
      })),
    [courses]
  );

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const [courseData, batchData, sessionData] = await Promise.all([
        getInstructorCourses(),
        getInstructorBatches(),
        getInstructorSessions(),
      ]);
      setCourses(Array.isArray(courseData) ? courseData : []);
      setBatches(Array.isArray(batchData) ? batchData : []);
      setSessions(Array.isArray(sessionData) ? sessionData : []);
    } catch (requestError) {
      const errorMessage = requestError?.response?.data?.message || "Failed to load batches and sessions";
      setError(errorMessage);
      showToast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBatchChange = (e) => {
    const { name, value } = e.target;
    setBatchFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateBatch = async (e) => {
    e.preventDefault();

    if (!batchFormData.courseId || !batchFormData.batch_name || !batchFormData.start_date || !batchFormData.end_date) {
      showToast("Course, batch name, start date and end date are required", "error");
      return;
    }

    try {
      setBatchSubmitting(true);
      await createInstructorBatch(batchFormData.courseId, {
        batch_name: batchFormData.batch_name,
        start_date: batchFormData.start_date,
        end_date: batchFormData.end_date,
        schedule: batchFormData.schedule || undefined,
        max_students: batchFormData.max_students ? Number(batchFormData.max_students) : undefined,
        status: batchFormData.status,
        timezone: batchFormData.timezone || undefined,
        days_of_week: batchFormData.days_of_week || undefined,
        session_time: batchFormData.session_time || undefined,
        enrollment_deadline: batchFormData.enrollment_deadline || undefined,
      });
      showToast("Batch created successfully", "success");
      setBatchFormData(initialBatchForm);
      await loadData();
    } catch (requestError) {
      showToast(requestError?.response?.data?.message || "Failed to create batch", "error");
    } finally {
      setBatchSubmitting(false);
    }
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();

    if (!formData.batchId || !formData.title || !formData.scheduled_at) {
      showToast("Batch, title and schedule are required", "error");
      return;
    }

    try {
      setSubmitting(true);
      await createInstructorSession(formData.batchId, {
        title: formData.title,
        description: formData.description,
        scheduled_at: formData.scheduled_at,
        duration_minutes: Number(formData.duration_minutes || 60),
        provider: "google_meet",
        join_url: formData.join_url || undefined,
        host_url: formData.host_url || undefined,
      });
      showToast(
        formData.join_url ? "Live session created" : "Live session created and Google Meet link generated",
        "success"
      );
      setFormData(initialForm);
      await loadData();
    } catch (requestError) {
      showToast(requestError?.response?.data?.message || "Failed to create session", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleStart = async (sessionId) => {
    try {
      await startInstructorSession(sessionId);
      showToast("Session started", "success");
      await loadData();
    } catch (requestError) {
      showToast(requestError?.response?.data?.message || "Failed to start session", "error");
    }
  };

  const handleEnd = async (sessionId) => {
    try {
      await endInstructorSession(sessionId);
      showToast("Session ended", "success");
      await loadData();
    } catch (requestError) {
      showToast(requestError?.response?.data?.message || "Failed to end session", "error");
    }
  };

  const handleCancel = async (sessionId) => {
    try {
      await cancelInstructorSession(sessionId);
      showToast("Session cancelled", "success");
      await loadData();
    } catch (requestError) {
      showToast(requestError?.response?.data?.message || "Failed to cancel session", "error");
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 0.6 }}>
        Manage Live Batches
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3.2 }}>
        Create and control Google Meet live sessions for your batches.
      </Typography>

      {error ? <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert> : null}

      <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0", mb: 2.2 }}>
        <CardContent sx={{ p: { xs: 2.2, md: 3 } }}>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5 }}>
            Create Batch
          </Typography>

          <Stack component="form" spacing={1.5} onSubmit={handleCreateBatch}>
            <TextField
              select
              label="Course"
              name="courseId"
              value={batchFormData.courseId}
              onChange={handleBatchChange}
              fullWidth
            >
              {courseOptions.map((course) => (
                <MenuItem key={course.id} value={course.id}>
                  {course.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Batch Name"
              name="batch_name"
              value={batchFormData.batch_name}
              onChange={handleBatchChange}
              fullWidth
            />
            <Grid container spacing={1.5}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Start Date"
                  name="start_date"
                  type="date"
                  value={batchFormData.start_date}
                  onChange={handleBatchChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="End Date"
                  name="end_date"
                  type="date"
                  value={batchFormData.end_date}
                  onChange={handleBatchChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={1.5}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Schedule"
                  name="schedule"
                  value={batchFormData.schedule}
                  onChange={handleBatchChange}
                  fullWidth
                  placeholder="Mon-Wed-Fri | 7:00 PM IST"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Max Students"
                  name="max_students"
                  type="number"
                  value={batchFormData.max_students}
                  onChange={handleBatchChange}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container spacing={1.5}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Timezone"
                  name="timezone"
                  value={batchFormData.timezone}
                  onChange={handleBatchChange}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  select
                  label="Status"
                  name="status"
                  value={batchFormData.status}
                  onChange={handleBatchChange}
                  fullWidth
                >
                  <MenuItem value="upcoming">Upcoming</MenuItem>
                  <MenuItem value="started">Started</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </TextField>
              </Grid>
            </Grid>
            <Grid container spacing={1.5}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Days of Week"
                  name="days_of_week"
                  value={batchFormData.days_of_week}
                  onChange={handleBatchChange}
                  fullWidth
                  placeholder="Mon, Wed, Fri"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Session Time"
                  name="session_time"
                  type="time"
                  value={batchFormData.session_time}
                  onChange={handleBatchChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
            <TextField
              label="Enrollment Deadline"
              name="enrollment_deadline"
              type="datetime-local"
              value={batchFormData.enrollment_deadline}
              onChange={handleBatchChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={batchSubmitting || loading}
              sx={{ textTransform: "none", alignSelf: "flex-start" }}
            >
              {batchSubmitting ? "Creating..." : "Create Batch"}
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0", mb: 2.2 }}>
        <CardContent sx={{ p: { xs: 2.2, md: 3 } }}>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.4 }}>
            My Batches
          </Typography>

          {loading ? (
            <Typography color="text.secondary">Loading batches...</Typography>
          ) : batches.length === 0 ? (
            <Typography color="text.secondary">No batches created yet.</Typography>
          ) : (
            <Stack spacing={1.2}>
              {batches.map((batch) => (
                <Box key={batch.id} sx={{ border: "1px solid #e2e8f0", borderRadius: 2, p: 1.4 }}>
                  <Typography sx={{ fontWeight: 700 }}>{batch.batch_name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Course ID: {batch.course_id} | Status: {batch.status}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {batch.start_date ? new Date(batch.start_date).toLocaleDateString() : "N/A"} -{" "}
                    {batch.end_date ? new Date(batch.end_date).toLocaleDateString() : "N/A"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {batch.schedule || `${batch.days_of_week || "TBA"} | ${batch.session_time || "TBA"}`}
                  </Typography>
                </Box>
              ))}
            </Stack>
          )}
        </CardContent>
      </Card>

      <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0", mb: 2.2 }}>
        <CardContent sx={{ p: { xs: 2.2, md: 3 } }}>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5 }}>
            Create Live Session
          </Typography>

          <Stack component="form" spacing={1.5} onSubmit={handleCreateSession}>
            <TextField
              select
              label="Batch"
              name="batchId"
              value={formData.batchId}
              onChange={handleChange}
              fullWidth
            >
              {batchOptions.map((batch) => (
                <MenuItem key={batch.id} value={batch.id}>
                  {batch.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField label="Session Title" name="title" value={formData.title} onChange={handleChange} fullWidth />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={2}
            />
            <Grid container spacing={1.5}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Schedule"
                  name="scheduled_at"
                  type="datetime-local"
                  value={formData.scheduled_at}
                  onChange={handleChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Duration (minutes)"
                  name="duration_minutes"
                  type="number"
                  value={formData.duration_minutes}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            </Grid>
            <TextField
              label="Google Meet Join URL (optional)"
              name="join_url"
              value={formData.join_url}
              onChange={handleChange}
              fullWidth
              helperText="Leave empty to auto-generate via Google Calendar API (if configured)."
            />
            <TextField
              label="Google Meet Host URL (optional)"
              name="host_url"
              value={formData.host_url}
              onChange={handleChange}
              fullWidth
            />

            <Button type="submit" variant="contained" disabled={submitting || loading} sx={{ textTransform: "none", alignSelf: "flex-start" }}>
              {submitting ? "Creating..." : "Create Session"}
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0" }}>
        <CardContent sx={{ p: { xs: 2.2, md: 3 } }}>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.4 }}>
            Live Sessions
          </Typography>

          {loading ? (
            <Typography color="text.secondary">Loading sessions...</Typography>
          ) : sessions.length === 0 ? (
            <Typography color="text.secondary">No sessions created yet.</Typography>
          ) : (
            <Stack spacing={1.4}>
              {sessions.map((session) => (
                <Box key={session.id} sx={{ border: "1px solid #e2e8f0", borderRadius: 2, p: 1.5 }}>
                  <Typography sx={{ fontWeight: 700 }}>{session.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Batch: {session.batch_name} | Course: {session.course_title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Scheduled: {new Date(session.scheduled_at).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Status: {session.status} | Provider: {session.provider}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                    <Button
                      size="small"
                      variant="contained"
                      disabled={session.status !== "scheduled"}
                      onClick={() => handleStart(session.id)}
                      sx={{ textTransform: "none" }}
                    >
                      Start
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      disabled={session.status !== "live"}
                      onClick={() => handleEnd(session.id)}
                      sx={{ textTransform: "none" }}
                    >
                      End
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="warning"
                      disabled={session.status !== "scheduled"}
                      onClick={() => handleCancel(session.id)}
                      sx={{ textTransform: "none" }}
                    >
                      Cancel
                    </Button>
                  </Stack>
                  <Divider sx={{ my: 1 }} />
                  <Button
                    size="small"
                    href={session.join_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    disabled={session.status === "cancelled"}
                    sx={{ textTransform: "none" }}
                  >
                    Open Meet Link
                  </Button>
                </Box>
              ))}
            </Stack>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
