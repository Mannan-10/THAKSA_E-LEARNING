import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { getMyBatch } from "../../services/batchService";

export default function MyBatch() {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const loadBatches = async () => {
      try {
        const data = await getMyBatch();
        if (active) setBatches(data);
      } catch (err) {
        console.error("Failed to load batches:", err);
      } finally {
        if (active) setLoading(false);
      }
    };
    loadBatches();
    return () => { active = false; };
  }, []);

  if (loading) {
    return (
      <Stack direction="row" spacing={1.2} alignItems="center">
        <CircularProgress size={20} />
        <Typography color="text.secondary">Loading batch details...</Typography>
      </Stack>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 0.6 }}>My Batch</Typography>
      <Typography color="text.secondary" sx={{ mb: 3.2 }}>
        Your assigned training batch details.
      </Typography>

      {batches.length === 0 ? (
        <Alert severity="info">You are not enrolled in any batch yet.</Alert>
      ) : (
        batches.map((batch) => (
          <Card key={batch.id} elevation={0} sx={cardSx}>
            <CardContent sx={{ p: { xs: 2.2, md: 3 } }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.4 }}>
                {batch.title || batch.batch_name}
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                Batch: {batch.batch_name}
              </Typography>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="body2" color="text.secondary">Course</Typography>
                  <Typography sx={{ fontWeight: 700, color: "#0f172a" }}>{batch.title || "N/A"}</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="body2" color="text.secondary">Status</Typography>
                  <Typography sx={{ fontWeight: 700, color: "#0f172a", textTransform: "capitalize" }}>{batch.status || "N/A"}</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="body2" color="text.secondary">Start Date</Typography>
                  <Typography sx={{ fontWeight: 700, color: "#0f172a" }}>
                    {batch.start_date ? new Date(batch.start_date).toLocaleDateString() : "N/A"}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="body2" color="text.secondary">End Date</Typography>
                  <Typography sx={{ fontWeight: 700, color: "#0f172a" }}>
                    {batch.end_date ? new Date(batch.end_date).toLocaleDateString() : "N/A"}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="body2" color="text.secondary">Schedule</Typography>
                  <Typography sx={{ fontWeight: 700, color: "#0f172a" }}>
                    {batch.schedule || `${batch.days_of_week || "TBA"} | ${batch.session_time || "TBA"}`}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="body2" color="text.secondary">Mode</Typography>
                  <Typography sx={{ fontWeight: 700, color: "#0f172a" }}>Live + Recorded</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
}

const cardSx = {
  borderRadius: 3,
  border: "1px solid #e2e8f0",
  boxShadow: "0 14px 26px rgba(15,23,42,0.05)",
  mb: 2.2,
};
