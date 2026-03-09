import { Box, Grid, Paper, Typography } from "@mui/material";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";
import CastForEducationRoundedIcon from "@mui/icons-material/CastForEducationRounded";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";

const steps = [
  {
    step: "01",
    title: "Assess",
    text: "We understand your current level and career goal.",
    icon: ExploreRoundedIcon,
    color: "#6366f1",
    bgColor: "rgba(99, 102, 241, 0.12)",
  },
  {
    step: "02",
    title: "Learn",
    text: "You attend structured sessions with mentor support.",
    icon: CastForEducationRoundedIcon,
    color: "#f97316",
    bgColor: "rgba(249, 115, 22, 0.12)",
  },
  {
    step: "03",
    title: "Build",
    text: "You complete practical tasks and project work step by step.",
    icon: RocketLaunchRoundedIcon,
    color: "#3b82f6",
    bgColor: "rgba(59, 130, 246, 0.12)",
  },
  {
    step: "04",
    title: "Apply",
    text: "You prepare for interviews and apply with clear guidance.",
    icon: TaskAltRoundedIcon,
    color: "#0f766e",
    bgColor: "rgba(15, 118, 110, 0.12)",
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
          fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif",
        }}
      >
        How Learning Works
      </Typography>
      <Typography sx={{ color: "#475569", mb: 3 }}>
        Assess - Learn - Build - Apply
      </Typography>

      <Grid container spacing={2.2}>
        {steps.map((item) => {
          const Icon = item.icon;
          return (
            <Grid key={item.step} size={{ xs: 12, sm: 6, md: 3 }}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRadius: 4,
                  border: "1px solid rgba(15, 23, 42, 0.04)",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(248,250,252,0.6) 100%)",
                  height: "100%",
                  boxShadow: "0 4px 12px rgba(15, 23, 42, 0.03)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 14px 28px rgba(15, 23, 42, 0.08)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 3,
                    bgcolor: item.bgColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 3,
                  }}
                >
                  <Icon sx={{ color: item.color, fontSize: 32 }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: "#0f172a", mb: 1.5 }}>
                  {item.title}
                </Typography>
                <Typography sx={{ color: "#475569" }}>{item.text}</Typography>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
