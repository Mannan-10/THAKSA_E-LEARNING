import { Box, Button, Card, CardContent, Chip, Grid, LinearProgress, Stack, Typography } from "@mui/material";

const batches = [
  { id: 1, name: "Cloud and DevOps - Batch A", students: 42, progress: 65, nextSession: "Tomorrow, 10:00 AM", status: "Active" },
  { id: 2, name: "Full Stack - Batch C", students: 38, progress: 20, nextSession: "Today, 02:30 PM", status: "Active" },
  { id: 3, name: "Data Science - Batch B", students: 44, progress: 100, nextSession: "Completed", status: "Completed" },
];

export default function ManageBatch() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 0.6 }}>Manage Batches</Typography>
      <Typography color="text.secondary" sx={{ mb: 3.2 }}>
        Monitor and manage your assigned student groups.
      </Typography>

      <Grid container spacing={2.2}>
        {batches.map((batch) => (
          <Grid key={batch.id} size={{ xs: 12, md: 6 }}>
            <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0", height: "100%" }}>
              <CardContent sx={{ p: 2.6 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1.6 }}>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>{batch.name}</Typography>
                  <Chip
                    label={batch.status}
                    size="small"
                    sx={{
                      fontWeight: 700,
                      bgcolor: batch.status === "Active" ? "#dcfce7" : "#f1f5f9",
                      color: batch.status === "Active" ? "#166534" : "#475569",
                    }}
                  />
                </Stack>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  Total Students: <strong style={{ color: "#0f172a" }}>{batch.students}</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1.8 }}>
                  Next Session: <strong style={{ color: "#0f172a" }}>{batch.nextSession}</strong>
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.8 }}>
                  Course Progress: {batch.progress}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={batch.progress}
                  sx={{
                    height: 10,
                    borderRadius: 999,
                    bgcolor: "#e2e8f0",
                    "& .MuiLinearProgress-bar": { borderRadius: 999, bgcolor: batch.status === "Completed" ? "#16a34a" : "#2563eb" },
                  }}
                />

                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                  <Button variant="contained" size="small">View Details</Button>
                  <Button variant="outlined" size="small">Attendance</Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
