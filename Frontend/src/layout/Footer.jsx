import { Box, Container, Grid, Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import logo from "../pages/HomePage/sections/logo.jpeg";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Workshops", to: "/workshops" },
  { label: "Training", to: "/training" },
  { label: "Contact", to: "/contact" },
];

const programs = [
  { label: "Courses", to: "/courses" },
  { label: "Batches", to: "/batches" },
  { label: "Projects", to: "/final-year-projects" },
  { label: "Placements", to: "/placements" },
];

function FooterLink({ label, to }) {
  return (
    <Link
      component={RouterLink}
      to={to}
      underline="none"
      sx={{
        color: "#64748b",
        fontSize: "0.95rem",
        transition: "color 0.2s ease",
        "&:hover": { color: "#1d4ed8" },
      }}
    >
      {label}
    </Link>
  );
}

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 10,
        borderTop: "1px solid rgba(15, 23, 42, 0.1)",
        background:
          "linear-gradient(180deg, rgba(248,250,252,0.96) 0%, rgba(241,245,249,0.98) 100%)",
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 6 } }}>
        <Grid container spacing={{ xs: 4, md: 6 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack spacing={1.5}>
              <Stack direction="row" spacing={1.2} alignItems="center">
                <Box
                  component="img"
                  src={logo}
                  alt="Thaksa Logo"
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: 1.5,
                    objectFit: "cover",
                    border: "1px solid rgba(15,23,42,0.12)",
                  }}
                />
                <Typography
                  sx={{
                    fontWeight: 900,
                    color: "#0f172a",
                    fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif",
                    fontSize: "1.12rem",
                  }}
                >
                  Thaksa E-Learning
                </Typography>
              </Stack>
              <Typography sx={{ color: "#475569", lineHeight: 1.75, maxWidth: 360 }}>
                Practical, mentor-led learning programs designed to help students build industry-relevant
                skills with confidence.
              </Typography>
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, md: 2.5 }}>
            <Stack spacing={1.2}>
              <Typography sx={{ fontWeight: 800, color: "#0f172a" }}>Quick Links</Typography>
              {quickLinks.map((link) => (
                <FooterLink key={link.to} {...link} />
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, md: 2.5 }}>
            <Stack spacing={1.2}>
              <Typography sx={{ fontWeight: 800, color: "#0f172a" }}>Programs</Typography>
              {programs.map((link) => (
                <FooterLink key={link.to} {...link} />
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Stack spacing={1.2}>
              <Typography sx={{ fontWeight: 800, color: "#0f172a" }}>Contact</Typography>
              <Typography sx={{ color: "#64748b", fontSize: "0.95rem" }}>
                thaksa.academy@gmail.com
              </Typography>
              <Typography sx={{ color: "#64748b", fontSize: "0.95rem" }}>
                +91 90525 15284
              </Typography>
              <Typography sx={{ color: "#64748b", fontSize: "0.95rem" }}>
                Hyderabad, Telangana, India
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: { xs: 4, md: 5 },
            pt: 2.4,
            borderTop: "1px solid rgba(148,163,184,0.22)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: { xs: "column", sm: "row" },
            gap: 1,
          }}
        >
          <Typography sx={{ color: "#64748b", fontSize: "0.9rem" }}>
            Copyright {new Date().getFullYear()} Thaksa. All rights reserved.
          </Typography>
          <Typography sx={{ color: "#94a3b8", fontSize: "0.86rem" }}>
            Built for skill-first careers
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
