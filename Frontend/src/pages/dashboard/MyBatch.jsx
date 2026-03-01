import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { getMyBatch } from "../../services/batchService";

const statusStyles = {
  upcoming: { bg: "#dcfce7", color: "#166534" },
  started: { bg: "#e0e7ff", color: "#3730a3" },
  completed: { bg: "#f1f5f9", color: "#475569" },
};

export default function MyBatch() {
  const navigate = useNavigate();
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
      <Typography variant="h4" sx={{ mb: 0.6, fontSize: { xs: "1.5rem", sm: "2rem", md: "2.125rem" } }}>
        My Batches
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3.2 }}>
        Your assigned training batch details.
      </Typography>

      {batches.length === 0 ? (
        <Alert severity="info">You are not enrolled in any batch yet.</Alert>
      ) : (
        <Grid container spacing={2}>
          {batches.map((batch) => {
            const status = (batch.status || "upcoming").toLowerCase();
            const sStyle = statusStyles[status] || statusStyles.upcoming;

            return (
              <Grid key={batch.id} size={{ xs: 12, sm: 6 }}>
                <Card
                  elevation={0}
                  sx={{
                    borderRadius: 3,
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 10px 24px rgba(15,23,42,0.05)",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform .22s ease, box-shadow .22s ease",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow: "0 16px 32px rgba(15,23,42,0.1)",
                    },
                  }}
                >
                  <CardContent sx={{ p: { xs: 2, md: 2.5 }, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 800, color: "#0f172a", fontSize: { xs: "1rem", md: "1.15rem" } }}>
                        {batch.title || batch.batch_name}
                      </Typography>
                      <Chip
                        label={batch.status || "Upcoming"}
                        size="small"
                        sx={{
                          fontWeight: 700,
                          textTransform: "capitalize",
                          bgcolor: sStyle.bg,
                          color: sStyle.color,
                          flexShrink: 0,
                          ml: 1,
                        }}
                      />
                    </Stack>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      <strong>Batch:</strong> {batch.batch_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      <strong>Schedule:</strong>{" "}
                      {batch.schedule || `${batch.days_of_week || "TBA"} | ${batch.session_time || "TBA"}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                      <strong>Start:</strong>{" "}
                      {batch.start_date ? new Date(batch.start_date).toLocaleDateString() : "N/A"}
                    </Typography>

                    <Button
                      variant="contained"
                      endIcon={<ArrowForwardRoundedIcon />}
                      onClick={() => navigate(`/dashboard/batch/${batch.id}`)}
                      sx={{
                        mt: "auto",
                        textTransform: "none",
                        borderRadius: 2,
                        fontWeight: 700,
                      }}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
}

