import { Box, Grid, Paper, Typography } from "@mui/material";

const steps = [
  {
    step: "01",
    title: "Choose a Path",
    text: "Pick a track based on your goal and current skill level.",
  },
  {
    step: "02",
    title: "Join Live Batches",
    text: "Attend mentor-led sessions and complete guided practical tasks.",
  },
  {
    step: "03",
    title: "Ship Portfolio Work",
    text: "Build real projects and showcase outcomes with confidence.",
  },
];

export default function ProcessSection() {
  return (
    <Box sx={{ mb: { xs: 6, md: 10 } }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 900,
          color: "#0f172a",
          mb: 3,
          fontFamily: "'Merriweather', Georgia, serif",
        }}
      >
        How Learning Works
      </Typography>

      <Grid container spacing={2.2}>
        {steps.map((item) => (
          <Grid key={item.step} size={{ xs: 12, md: 4 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3.5,
                border: "1px solid rgba(30, 41, 59, 0.12)",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(239,246,255,0.6) 100%)",
                height: "100%",
              }}
            >
              <Typography sx={{ fontWeight: 900, color: "#0f766e", mb: 1 }}>{item.step}</Typography>
              <Typography variant="h6" sx={{ fontWeight: 800, color: "#0f172a", mb: 1 }}>
                {item.title}
              </Typography>
              <Typography sx={{ color: "#475569" }}>{item.text}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
