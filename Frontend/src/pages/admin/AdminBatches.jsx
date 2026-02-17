import { useEffect, useState } from "react";
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
import { getAdminBatches } from "../../services/adminServices";

export default function AdminBatches() {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewBatch, setViewBatch] = useState(null);

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        setLoading(true);
        const data = await getAdminBatches();
        setBatches(data?.batches || []);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load batches");
      } finally {
        setLoading(false);
      }
    };
    fetchBatches();
  }, []);

  const statusColor = (status) => {
    const s = (status || "").toLowerCase();
    if (s === "started" || s === "active") return { bg: "#dcfce7", color: "#166534" };
    if (s === "upcoming") return { bg: "#e0f2fe", color: "#0369a1" };
    if (s === "completed") return { bg: "#f1f5f9", color: "#475569" };
    return { bg: "#f1f5f9", color: "#475569" };
  };

  if (loading) {
    return (
      <Stack direction="row" spacing={1.2} alignItems="center">
        <CircularProgress size={20} />
        <Typography color="text.secondary">Loading batches...</Typography>
      </Stack>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2.2 }}>Batches</Typography>

      {error ? <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert> : null}

      <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0" }}>
        <CardContent sx={{ p: 0 }}>
          {batches.length === 0 ? (
            <Alert severity="info" sx={{ m: 2 }}>No batches found.</Alert>
          ) : (
            <TableContainer sx={{ overflowX: "auto" }}>
              <Table sx={{ minWidth: 720 }}>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Batch Name</strong></TableCell>
                    <TableCell><strong>Course</strong></TableCell>
                    <TableCell><strong>Instructor</strong></TableCell>
                    <TableCell><strong>Students</strong></TableCell>
                    <TableCell><strong>Status</strong></TableCell>
                    <TableCell><strong>Actions</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {batches.map((batch) => {
                    const sc = statusColor(batch.status);
                    return (
                      <TableRow key={batch.id} hover>
                        <TableCell>{batch.batch_name}</TableCell>
                        <TableCell>{batch.course_title}</TableCell>
                        <TableCell>{batch.instructor_name}</TableCell>
                        <TableCell>{batch.enrolled_count}</TableCell>
                        <TableCell>
                          <Chip
                            label={batch.status || "N/A"}
                            size="small"
                            sx={{ fontWeight: 700, bgcolor: sc.bg, color: sc.color, textTransform: "capitalize" }}
                          />
                        </TableCell>
                        <TableCell>
                          <Button size="small" variant="outlined" onClick={() => setViewBatch(batch)}>View</Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      <Dialog open={Boolean(viewBatch)} onClose={() => setViewBatch(null)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>Batch Details</DialogTitle>
        <DialogContent>
          {viewBatch && (
            <Grid container spacing={2} sx={{ pt: 1 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="body2" color="text.secondary">Batch Name</Typography>
                <Typography sx={{ fontWeight: 700 }}>{viewBatch.batch_name}</Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="body2" color="text.secondary">Course</Typography>
                <Typography sx={{ fontWeight: 700 }}>{viewBatch.course_title}</Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="body2" color="text.secondary">Instructor</Typography>
                <Typography sx={{ fontWeight: 700 }}>{viewBatch.instructor_name}</Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="body2" color="text.secondary">No. of Students</Typography>
                <Typography sx={{ fontWeight: 700 }}>{viewBatch.enrolled_count}</Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="body2" color="text.secondary">Start Date</Typography>
                <Typography sx={{ fontWeight: 700 }}>
                  {viewBatch.start_date ? new Date(viewBatch.start_date).toLocaleDateString() : "N/A"}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="body2" color="text.secondary">End Date</Typography>
                <Typography sx={{ fontWeight: 700 }}>
                  {viewBatch.end_date ? new Date(viewBatch.end_date).toLocaleDateString() : "N/A"}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="body2" color="text.secondary">Schedule</Typography>
                <Typography sx={{ fontWeight: 700 }}>
                  {viewBatch.schedule || `${viewBatch.days_of_week || "TBA"} | ${viewBatch.session_time || "TBA"}`}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="body2" color="text.secondary">Status</Typography>
                <Typography sx={{ fontWeight: 700, textTransform: "capitalize" }}>{viewBatch.status || "N/A"}</Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewBatch(null)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
