import { Box, Card, CardContent, Grid, LinearProgress, Stack, Typography } from "@mui/material";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";

const stats = [
  { title: "Active Courses", value: "3", icon: <MenuBookRoundedIcon sx={{ color: "#1d4ed8" }} /> },
  { title: "Current Batch", value: "DevOps + AWS", icon: <GroupsRoundedIcon sx={{ color: "#0f766e" }} /> },
  { title: "Progress", value: "62%", icon: <BarChartRoundedIcon sx={{ color: "#9333ea" }} /> },
  { title: "Upcoming Sessions", value: "2", icon: <EventAvailableRoundedIcon sx={{ color: "#ea580c" }} /> },
];

export default function UserDashboard() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 0.6 }}>
        Welcome back
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3.2 }}>
        Continue your learning journey with Thaksa.
      </Typography>

      <Grid container spacing={2.2} sx={{ mb: 3.2 }}>
        {stats.map((stat) => (
          <Grid key={stat.title} size={{ xs: 12, sm: 6, lg: 3 }}>
            <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0", height: "100%" }}>
              <CardContent sx={{ p: 2.4 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
                  <Box>
                    <Typography color="text.secondary" variant="body2" sx={{ mb: 0.8 }}>
                      {stat.title}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 900, color: "#0f172a" }}>
                      {stat.value}
                    </Typography>
                  </Box>
                  {stat.icon}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card
        elevation={0}
        sx={{
          borderRadius: 3,
          border: "1px solid #e2e8f0",
          boxShadow: "0 16px 28px rgba(15,23,42,0.06)",
        }}
      >
        <CardContent sx={{ p: { xs: 2.2, md: 3 } }}>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.8 }}>
            Currently Learning
          </Typography>
          <Typography sx={{ fontWeight: 700, color: "#0f172a", mb: 0.4 }}>
            AWS and DevOps Professional Bootcamp
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.8 }}>
            Next session: Tomorrow at 7:00 PM
          </Typography>
          <LinearProgress
            variant="determinate"
            value={62}
            sx={{ height: 10, borderRadius: 999, bgcolor: "#e2e8f0", "& .MuiLinearProgress-bar": { borderRadius: 999 } }}
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Progress: 62%
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
