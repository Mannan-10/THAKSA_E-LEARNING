import { useEffect, useRef, useState } from "react";
import { Box, Button, Card, Chip, Container, Grid, Stack, Typography } from "@mui/material";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import FactCheckRoundedIcon from "@mui/icons-material/FactCheckRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import { Link as RouterLink } from "react-router-dom";

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.12 }
    );

    if (ref.current) {
      obs.observe(ref.current);
    }

    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

function Reveal({ children, delay = 0, sx = {} }) {
  const { ref, visible } = useReveal();

  return (
    <Box
      ref={ref}
      sx={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: `all 0.6s ease ${delay}ms`,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

const highlights = [
  {
    icon: WorkRoundedIcon,
    title: "Placement-First Training",
    desc: "Role-oriented learning tracks aligned to current hiring requirements.",
    color: "#1d4ed8",
    bg: "rgba(29,78,216,0.1)",
  },
  {
    icon: FactCheckRoundedIcon,
    title: "Interview Preparation",
    desc: "Mock interviews, resume reviews, and role-based question banks.",
    color: "#0f766e",
    bg: "rgba(15,118,110,0.1)",
  },
  {
    icon: GroupsRoundedIcon,
    title: "Mentor Support",
    desc: "Weekly mentor checkpoints with personalized feedback and action plans.",
    color: "#9333ea",
    bg: "rgba(147,51,234,0.1)",
  },
  {
    icon: BusinessRoundedIcon,
    title: "Hiring Connections",
    desc: "Access to partner-company opportunities and referral-driven pipelines.",
    color: "#ea580c",
    bg: "rgba(234,88,12,0.1)",
  },
];

export default function PlacementsPage() {
  return (
    <Box sx={{ bgcolor: "#fff" }}>
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          textAlign: "center",
          background: "linear-gradient(135deg, #eff6ff 0%, #f8fafc 50%, #f0fdfa 100%)",
          borderBottom: "1px solid rgba(15,23,42,0.08)",
        }}
      >
        <Container maxWidth="md">
          <Reveal>
            <Chip
              label="Placement Support"
              sx={{
                mb: 2.2,
                fontWeight: 700,
                bgcolor: "rgba(29,78,216,0.1)",
                color: "#1d4ed8",
              }}
            />
            <Typography
              variant="h1"
              sx={{
                fontWeight: 900,
                fontSize: { xs: "2.1rem", md: "3.4rem" },
                color: "#0f172a",
                lineHeight: 1.1,
                fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif",
              }}
            >
              Placements
            </Typography>
            <Typography
              sx={{
                mt: 2,
                color: "#475569",
                fontSize: { xs: "1rem", md: "1.08rem" },
                lineHeight: 1.75,
              }}
            >
              Focused support to help students transition from skill building to job offers with
              structured preparation and hiring guidance.
            </Typography>
          </Reveal>
        </Container>
      </Box>

      <Box sx={{ py: { xs: 7, md: 10 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={2.5}>
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <Grid key={item.title} size={{ xs: 12, sm: 6, md: 3 }}>
                  <Reveal delay={index * 100}>
                    <Card
                      elevation={0}
                      sx={{
                        p: 3,
                        height: "100%",
                        borderRadius: 4,
                        border: "1.5px solid rgba(15,23,42,0.08)",
                      }}
                    >
                      <Box
                        sx={{
                          width: 52,
                          height: 52,
                          borderRadius: 2.5,
                          bgcolor: item.bg,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mb: 2,
                        }}
                      >
                        <Icon sx={{ color: item.color, fontSize: 28 }} />
                      </Box>
                      <Typography sx={{ fontWeight: 800, color: "#0f172a", mb: 1 }}>
                        {item.title}
                      </Typography>
                      <Typography sx={{ color: "#64748b", fontSize: "0.93rem", lineHeight: 1.7 }}>
                        {item.desc}
                      </Typography>
                    </Card>
                  </Reveal>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      <Box sx={{ py: { xs: 8, md: 11 }, bgcolor: "#f8fafc" }}>
        <Container maxWidth="md">
          <Reveal sx={{ textAlign: "center" }}>
            <Stack spacing={2.2} alignItems="center">
              <TrendingUpRoundedIcon sx={{ color: "#1d4ed8", fontSize: 42 }} />
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: "1.8rem", md: "2.5rem" },
                  color: "#0f172a",
                  fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif",
                }}
              >
                Ready to Start?
              </Typography>
              <Typography sx={{ color: "#475569", lineHeight: 1.75 }}>
                Explore our complete Training and Placement flow to get interview-ready and connect
                with hiring opportunities.
              </Typography>
              <Button
                component={RouterLink}
                to="/training"
                variant="contained"
                sx={{
                  mt: 1,
                  px: 3.2,
                  py: 1.2,
                  borderRadius: 2.5,
                  textTransform: "none",
                  fontWeight: 800,
                  bgcolor: "#1d4ed8",
                  "&:hover": { bgcolor: "#1e40af" },
                }}
              >
                Go to Training Program
              </Button>
            </Stack>
          </Reveal>
        </Container>
      </Box>
    </Box>
  );
}

