import { Box, Button, Card, CardContent, Chip, Grid, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BugReportRoundedIcon from "@mui/icons-material/BugReportRounded";
import CloudRoundedIcon from "@mui/icons-material/CloudRounded";
import MemoryRoundedIcon from "@mui/icons-material/MemoryRounded";

const tracks = [
  {
    title: "Software Testing Engineering",
    level: "Beginner to Intermediate",
    blurb: " Learn testing frameworks, automation, and best practices.",
    icon: BugReportRoundedIcon,
    color: "#6366f1",
    bgColor: "rgba(99, 102, 241, 0.12)",
  },
  {
    title: "Aws DevOps",
    level: "Intermediate",
    blurb: "Learn CI/CD, containerization, and cloud infrastructure best practices.",
    icon: CloudRoundedIcon,
    color: "#f97316",
    bgColor: "rgba(249, 115, 22, 0.12)",
  },
  {
    title: "Data Science & AI Foundations",
    level: "Beginner",
    blurb: "Learn data processing, ML basics, and practical model workflows.",
    icon: MemoryRoundedIcon,
    color: "#3b82f6",
    bgColor: "rgba(59, 130, 246, 0.12)",
  },
];

export default function TracksSection() {
  const navigate = useNavigate();

  return (
    <Box sx={{ mb: { xs: 6, md: 10 } }}>
      <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" sx={{ mb: 3 }}>
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 900,
              color: "#0f172a",
              fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif",
            }}
          >
            Learning Tracks
          </Typography>
          <Typography sx={{ color: "#475569", mt: 1 }}>
            Designed to align with modern hiring expectations.
          </Typography>
        </Box>
        <Button
          variant="text"
          onClick={() => navigate("/courses")}
          sx={{ mt: { xs: 1.5, md: 0 }, fontWeight: 700, color: "#1d4ed8" }}
        >
          View All Courses
        </Button>
      </Stack>

      <Grid container spacing={2.2}>
        {tracks.map((track) => {
          const Icon = track.icon;
          return (
            <Grid key={track.title} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 4,
                  border: "1px solid rgba(15, 23, 42, 0.04)",
                  height: "100%",
                  boxShadow: "0 4px 12px rgba(15, 23, 42, 0.03)",
                  transition: "transform .3s ease, box-shadow .3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 14px 28px rgba(15, 23, 42, 0.08)",
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 3,
                      bgcolor: track.bgColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2.5,
                    }}
                  >
                    <Icon sx={{ color: track.color, fontSize: 32 }} />
                  </Box>
                  <Chip
                    label={track.level}
                    size="small"
                    sx={{
                      mb: 1.8,
                      bgcolor: "rgba(15, 118, 110, 0.12)",
                      color: "#0f766e",
                      fontWeight: 700,
                    }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#0f172a", mb: 1 }}>
                    {track.title}
                  </Typography>
                  <Typography sx={{ color: "#475569" }}>{track.blurb}</Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
