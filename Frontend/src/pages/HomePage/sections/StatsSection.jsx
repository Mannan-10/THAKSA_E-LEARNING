import { Grid, Paper, Typography } from "@mui/material";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";

const stats = [
  { title: "Active Learners", value: "100+", icon: GroupRoundedIcon },
  { title: "Guided Courses", value: "6+", icon: MenuBookRoundedIcon },
  { title: "Completion Rate", value: "91%", icon: WorkspacePremiumRoundedIcon },
  { title: "Mentor Sessions", value: "100+", icon: PsychologyRoundedIcon },
];

export default function StatsSection() {
  return (
    <Grid container spacing={2.2} sx={{ mb: { xs: 6, md: 10 } }}>
      {stats.map((item) => {
        const Icon = item.icon;
        return (
          <Grid key={item.title} size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: 3.5,
                border: "1px solid rgba(15, 23, 42, 0.08)",
                background:
                  "linear-gradient(160deg, rgba(255,255,255,0.98) 0%, rgba(241,245,249,0.95) 100%)",
                height: "100%",
              }}
            >
              <Icon sx={{ color: "#1d4ed8", fontSize: 28, mb: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 900, color: "#0f172a" }}>
                {item.value}
              </Typography>
              <Typography sx={{ color: "#475569", fontWeight: 600 }}>{item.title}</Typography>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
}
