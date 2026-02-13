import { Box, Button, Stack, Typography } from "@mui/material";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import { useNavigate } from "react-router-dom";

export default function CtaSection() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        borderRadius: 5,
        p: { xs: 3, md: 5 },
        border: "1px solid rgba(37, 99, 235, 0.22)",
        background:
          "linear-gradient(120deg, rgba(37,99,235,0.14) 0%, rgba(15,118,110,0.13) 100%)",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 900,
          color: "#0f172a",
          mb: 1.2,
          fontSize: { xs: "1.6rem", md: "2rem" },
          fontFamily: "'Merriweather', Georgia, serif",
        }}
      >
        Start Your Career-Oriented Learning Journey
      </Typography>
      <Typography sx={{ color: "#334155", mb: 3 }}>
        Join structured batches, track your progress, and build portfolio-ready work.
      </Typography>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Button
          variant="contained"
          size="large"
          endIcon={<RocketLaunchRoundedIcon />}
          onClick={() => navigate("/signup")}
          sx={{
            py: 1.4,
            px: 3.2,
            borderRadius: 3,
            fontWeight: 700,
            bgcolor: "#2563eb",
            "&:hover": { bgcolor: "#1d4ed8" },
          }}
        >
          Get Started
        </Button>
        <Button
          variant="outlined"
          size="large"
          onClick={() => navigate("/contact")}
          sx={{
            py: 1.4,
            px: 3.2,
            borderRadius: 3,
            fontWeight: 700,
            borderColor: "#0f766e",
            color: "#0f766e",
            "&:hover": { borderColor: "#0d665e", bgcolor: "rgba(15, 118, 110, 0.06)" },
          }}
        >
          Talk to Us
        </Button>
      </Stack>
    </Box>
  );
}
