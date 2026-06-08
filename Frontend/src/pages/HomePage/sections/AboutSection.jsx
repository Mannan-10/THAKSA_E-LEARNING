import { useEffect, useRef, useState } from "react";
import { Box, Card, Container, Grid, Stack, Typography } from "@mui/material";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import SpeedRoundedIcon from "@mui/icons-material/SpeedRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function RevealBox({ children, delay = 0, direction = "up", sx = {} }) {
  const { ref, visible } = useReveal();
  const t = {
    up: visible ? "translateY(0)" : "translateY(48px)",
    left: visible ? "translateX(0)" : "translateX(-48px)",
    right: visible ? "translateX(0)" : "translateX(48px)",
  };
  return (
    <Box
      ref={ref}
      sx={{
        opacity: visible ? 1 : 0,
        transform: t[direction],
        transition: `all 0.75s cubic-bezier(0.34,1.2,0.64,1) ${delay}ms`,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

const highlights = [
  {
    icon: AutoAwesomeRoundedIcon,
    title: "Forge Industry Skills",
    desc: "Move beyond theory. Our curriculum is tailored around actual production environments, modern frameworks, and cloud architectures.",
    color: "#6366f1",
    bgGlow: "rgba(99,102,241,0.08)",
  },
  {
    icon: WorkspacePremiumRoundedIcon,
    title: "Structured Mentorship",
    desc: "Learn with guided milestones. Get regular code reviews, aptitude check-ins, and soft skill training directly from industry experts.",
    color: "#0f766e",
    bgGlow: "rgba(15,118,110,0.08)",
  },
  {
    icon: SpeedRoundedIcon,
    title: "Career Transformation",
    desc: "From mock interviews to active resume optimization, we provide end-to-end support to help you land your dream job confidently.",
    color: "#d97706",
    bgGlow: "rgba(217,119,6,0.08)",
  },
];

export default function AboutSection() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "transparent" }}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center">
          {/* Left: Heading & Description */}
          <Grid size={{ xs: 12, md: 6 }}>
            <RevealBox direction="left">
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: "0.75rem",
                  color: "#2563eb",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  mb: 1.5,
                }}
              >
                About SkillForge
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: "2rem", md: "2.8rem" },
                  color: "#0f172a",
                  fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif",
                  lineHeight: 1.15,
                  mb: 2.5,
                }}
              >
                Forging the Future of{" "}
                <Box
                  component="span"
                  sx={{
                    background: "linear-gradient(90deg, #2563eb, #0f766e)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Tech Education
                </Box>
              </Typography>
              <Typography
                sx={{
                  color: "#475569",
                  fontSize: "1.05rem",
                  lineHeight: 1.8,
                  mb: 3.5,
                }}
              >
                SkillForge is a premier full-stack e-learning and career-acceleration platform
                designed to bridge the gap between academic learning and industry standards.
                We offer mentor-led, structured training programs in technical domains, quantitative
                aptitude, and soft skills to empower students and fresh graduates to forge successful careers.
              </Typography>
              <Stack direction="row" spacing={3} sx={{ pl: 1, borderLeft: "3px solid #2563eb" }}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 900, color: "#0f172a" }}>
                    5000+
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                    Students Mentored
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 900, color: "#0f172a" }}>
                    98%
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                    Satisfaction Rate
                  </Typography>
                </Box>
              </Stack>
            </RevealBox>
          </Grid>

          {/* Right: Highlighting Cards */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={2.5}>
              {highlights.map((h, i) => {
                const Icon = h.icon;
                return (
                  <RevealBox key={h.title} delay={i * 120} direction="right">
                    <Card
                      elevation={0}
                      sx={{
                        p: 3,
                        borderRadius: 4,
                        border: "1.5px solid rgba(15,23,42,0.06)",
                        bgcolor: "rgba(255, 255, 255, 0.8)",
                        backdropFilter: "blur(8px)",
                        boxShadow: "0 4px 20px rgba(15,23,42,0.03)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: "0 16px 32px rgba(15,23,42,0.06)",
                          borderColor: "rgba(37,99,235,0.15)",
                        },
                      }}
                    >
                      <Stack direction="row" spacing={2.5} alignItems="flex-start">
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 3,
                            bgcolor: h.bgGlow,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <Icon sx={{ color: h.color, fontSize: 24 }} />
                        </Box>
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 800, color: "#0f172a", mb: 0.5, fontSize: "1.05rem" }}
                          >
                            {h.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "#64748b", lineHeight: 1.6 }}
                          >
                            {h.desc}
                          </Typography>
                        </Box>
                      </Stack>
                    </Card>
                  </RevealBox>
                );
              })}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
