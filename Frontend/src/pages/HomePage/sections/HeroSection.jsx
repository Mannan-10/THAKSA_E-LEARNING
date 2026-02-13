import { Box, Button, Chip, Container, Stack, Typography } from "@mui/material";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import AutoGraphRoundedIcon from "@mui/icons-material/AutoGraphRounded";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        py: { xs: 8, md: 14 },
        borderBottom: "1px solid rgba(15, 23, 42, 0.08)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 16% 10%, rgba(37,99,235,0.22) 0%, rgba(37,99,235,0) 48%), radial-gradient(circle at 88% 88%, rgba(15,118,110,0.18) 0%, rgba(15,118,110,0) 50%)",
          pointerEvents: "none",
        }}
      />
      <Container maxWidth="lg" sx={{ position: "relative" }}>
        <Stack spacing={3} sx={{ maxWidth: 760 }}>
          <Chip
            icon={<SchoolRoundedIcon />}
            label="Industry-ready learning platform"
            sx={{
              width: "fit-content",
              px: 1,
              fontWeight: 700,
              bgcolor: "rgba(37, 99, 235, 0.12)",
              color: "#1d4ed8",
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2.1rem", md: "3.5rem" },
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              fontWeight: 900,
              color: "#0f172a",
              fontFamily: "'Merriweather', Georgia, serif",
            }}
          >
            Build Real Skills, Not Just Certificates
          </Typography>
          <Typography sx={{ fontSize: { xs: "1rem", md: "1.15rem" }, color: "#334155" }}>
            Structured programs, live mentorship, and practical batches that help
            students become job-ready with measurable progress.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button
              size="large"
              variant="contained"
              endIcon={<AutoGraphRoundedIcon />}
              onClick={() => navigate("/courses")}
              sx={{
                py: 1.4,
                px: 3.2,
                fontWeight: 700,
                borderRadius: 3,
                bgcolor: "#2563eb",
                boxShadow: "0 14px 28px rgba(37, 99, 235, 0.32)",
                "&:hover": { bgcolor: "#1d4ed8" },
              }}
            >
              Explore Courses
            </Button>
            <Button
              size="large"
              variant="outlined"
              onClick={() => navigate("/batches")}
              sx={{
                py: 1.4,
                px: 3.2,
                fontWeight: 700,
                borderRadius: 3,
                borderColor: "#0f766e",
                color: "#0f766e",
                "&:hover": { borderColor: "#0d665e", bgcolor: "rgba(15, 118, 110, 0.06)" },
              }}
            >
              Join Upcoming Batches
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
