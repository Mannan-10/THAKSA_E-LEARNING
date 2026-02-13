import { Box, Button, Card, CardContent, Chip, Grid, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const tracks = [
  {
    title: "Frontend Engineering",
    level: "Beginner to Intermediate",
    blurb: "Master React, component architecture, state patterns, and UI performance.",
  },
  {
    title: "Backend & APIs",
    level: "Intermediate",
    blurb: "Build secure APIs, authentication flow, and scalable service logic.",
  },
  {
    title: "Data & AI Foundations",
    level: "Beginner",
    blurb: "Learn data processing, ML basics, and practical model workflows.",
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
              fontFamily: "'Merriweather', Georgia, serif",
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
        {tracks.map((track) => (
          <Grid key={track.title} size={{ xs: 12, md: 4 }}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3.5,
                border: "1px solid rgba(30, 41, 59, 0.12)",
                height: "100%",
                transition: "transform .25s ease, box-shadow .25s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 18px 28px rgba(15, 23, 42, 0.1)",
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
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
        ))}
      </Grid>
    </Box>
  );
}
