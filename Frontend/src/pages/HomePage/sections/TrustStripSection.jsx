import { Box, Grid, Paper, Typography } from "@mui/material";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import DomainVerificationRoundedIcon from "@mui/icons-material/DomainVerificationRounded";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";

const trustPoints = [
  {
    icon: GroupsRoundedIcon,
    value: "500+",
    label: "Students Trained",
    color: "#2563eb",
    bg: "rgba(37,99,235,0.1)",
  },
  {
    icon: SchoolRoundedIcon,
    value: "20+", 
    label: "Colleges Partnered",
    color: "#0f766e",
    bg: "rgba(15,118,110,0.1)",
  },
  {
    icon: DomainVerificationRoundedIcon,
    value: "4.8/5",
    label: "Average Rating",
    color: "#d97706",
    bg: "rgba(217,119,6,0.1)",
  },
  {
    icon: WorkspacePremiumRoundedIcon,
    value: "5+",
    label: "Years of Mentoring",
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.1)",
  },
];

export default function TrustStripSection() {
  return (
    <Box
      sx={{
        mb: { xs: 5, md: 8 },
        p: { xs: 2.2, md: 2.8 },
        borderRadius: 4,
        background: "linear-gradient(135deg, #fffdf7 0%, #eef6ff 100%)",
        border: "1px solid rgba(15,23,42,0.06)",
      }}
    >
      <Grid container spacing={2}>
        {trustPoints.map((point) => {
          const Icon = point.icon;
          return (
            <Grid key={point.label} size={{ xs: 6, md: 3 }}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2.2, md: 2.6 },
                  borderRadius: 3,
                  border: "1px solid rgba(15,23,42,0.08)",
                  textAlign: "center",
                  height: "100%",
                  backgroundColor: "#ffffff",
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: 2,
                    mx: "auto",
                    mb: 1.2,
                    bgcolor: point.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon sx={{ color: point.color, fontSize: 24 }} />
                </Box>
                <Typography sx={{ fontWeight: 900, color: "#0f172a", fontSize: { xs: "1.05rem", md: "1.35rem" } }}>
                  {point.value}
                </Typography>
                <Typography sx={{ color: "#475569", fontSize: { xs: "0.78rem", md: "0.88rem" }, fontWeight: 600 }}>
                  {point.label}
                </Typography>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
