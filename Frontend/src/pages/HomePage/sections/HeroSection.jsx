import { Box, Card, Chip, Container, Grid, Stack, Typography } from "@mui/material";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const modules = [
  {
    id: "workshops",
    icon: BuildRoundedIcon,
    title: "Workshops",
    subtitle: "Hands-On Learning",
    description:
      "Industry-led offline workshops designed to give students real-world exposure through live projects, expert sessions, and collaborative problem-solving.",
    color: "#6366f1",
    gradient: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
    bgGlow: "rgba(99,102,241,0.12)",
    borderColor: "rgba(99,102,241,0.25)",
    route: "/workshops",
    tag: "Offline Mode",
    tagColor: "#6366f1",
    tagBg: "rgba(99,102,241,0.1)",
  },
  {
    id: "training",
    icon: WorkspacePremiumRoundedIcon,
    title: "Training & Placement",
    subtitle: "Career Launch Program",
    description:
      "Structured training tracks with aptitude, technical, and soft-skill modules, followed by dedicated placement support with top hiring companies.",
    color: "#0f766e",
    gradient: "linear-gradient(135deg, #0f766e 0%, #0891b2 100%)",
    bgGlow: "rgba(15,118,110,0.12)",
    borderColor: "rgba(15,118,110,0.25)",
    route: "/training",
    tag: "Placement Assured",
    tagColor: "#0f766e",
    tagBg: "rgba(15,118,110,0.1)",
  },
  {
    id: "fyp",
    icon: RocketLaunchRoundedIcon,
    title: "Final Year Projects",
    subtitle: "Build Real-World Solutions",
    description:
      "Guided project execution with domain experts, documentation support, IEEE-standard reporting, and live demos that stand out in interviews.",
    color: "#d97706",
    gradient: "linear-gradient(135deg, #d97706 0%, #ea580c 100%)",
    bgGlow: "rgba(217,119,6,0.12)",
    borderColor: "rgba(217,119,6,0.25)",
    route: "/final-year-projects",
    tag: "Industry Grade",
    tagColor: "#d97706",
    tagBg: "rgba(217,119,6,0.1)",
  },
];

function AnimatedCard({ module, index }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const Icon = module.icon;

  return (
    <Grid ref={ref} size={{ xs: 12, sm: 6, md: 4 }}>
      <Card
        onClick={() => navigate(module.route)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        elevation={0}
        sx={{
          cursor: "pointer",
          height: "100%",
          borderRadius: 4,
          border: `1.5px solid ${module.borderColor}`,
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(12px)",
          boxShadow: hovered
            ? `0 24px 48px ${module.bgGlow}, 0 8px 24px rgba(15,23,42,0.08)`
            : "0 4px 16px rgba(15,23,42,0.05)",
          transform: visible
            ? hovered ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)"
            : "translateY(40px) scale(0.97)",
          opacity: visible ? 1 : 0,
          transition: `all 0.55s cubic-bezier(0.34,1.56,0.64,1) ${index * 120}ms`,
          position: "relative",
          overflow: "hidden",
          p: { xs: 3, md: 3.5 },
        }}
      >
        {/* Glow blob */}
        <Box
          sx={{
            position: "absolute",
            top: -30,
            right: -30,
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: module.gradient,
            opacity: hovered ? 0.15 : 0.07,
            filter: "blur(30px)",
            transition: "opacity 0.4s ease",
            pointerEvents: "none",
          }}
        />

        {/* Icon */}
        <Box
          sx={{
            width: 58,
            height: 58,
            borderRadius: 3,
            background: module.gradient,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2.5,
            boxShadow: `0 8px 20px ${module.bgGlow}`,
          }}
        >
          <Icon sx={{ color: "#fff", fontSize: 30 }} />
        </Box>

        <Chip
          label={module.tag}
          size="small"
          sx={{
            mb: 1.5,
            fontWeight: 700,
            fontSize: "0.72rem",
            bgcolor: module.tagBg,
            color: module.tagColor,
            border: `1px solid ${module.borderColor}`,
          }}
        />

        <Typography
          variant="h6"
          sx={{
            fontWeight: 900,
            color: "#0f172a",
            fontFamily: "'Merriweather', Georgia, serif",
            mb: 0.5,
            lineHeight: 1.2,
          }}
        >
          {module.title}
        </Typography>
        <Typography
          sx={{
            fontSize: "0.82rem",
            fontWeight: 700,
            color: module.color,
            mb: 1.5,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          {module.subtitle}
        </Typography>
        <Typography sx={{ color: "#475569", fontSize: "0.92rem", lineHeight: 1.6, mb: 2.5 }}>
          {module.description}
        </Typography>

        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: module.color }}>
          <Typography sx={{ fontWeight: 700, fontSize: "0.88rem" }}>Learn More</Typography>
          <ArrowForwardRoundedIcon
            sx={{
              fontSize: 18,
              transform: hovered ? "translateX(4px)" : "translateX(0)",
              transition: "transform 0.3s ease",
            }}
          />
        </Stack>
      </Card>
    </Grid>
  );
}

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        pt: { xs: 7, sm: 9, md: 14 },
        pb: { xs: 6, sm: 8, md: 12 },
        borderBottom: "1px solid rgba(15,23,42,0.08)",
      }}
    >
      {/* Background radial glows */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 10% 15%, rgba(99,102,241,0.18) 0%, transparent 45%), radial-gradient(circle at 90% 80%, rgba(15,118,110,0.16) 0%, transparent 45%), radial-gradient(circle at 55% 50%, rgba(217,119,6,0.08) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />

      {/* Subtle grid pattern */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(15,23,42,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative" }}>
        {/* Badge */}
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            bgcolor: "rgba(99,102,241,0.1)",
            border: "1px solid rgba(99,102,241,0.2)",
            borderRadius: 10,
            px: 2,
            py: 0.7,
            mb: 3,
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(-12px)",
            transition: "all 0.5s ease",
          }}
        >
          <SchoolRoundedIcon sx={{ fontSize: 18, color: "#6366f1" }} />
          <Typography sx={{ fontWeight: 700, fontSize: "0.82rem", color: "#6366f1" }}>
            THAKSA Academy — Empowering Future Professionals
          </Typography>
        </Box>

        {/* Main Headline */}
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "2.2rem", sm: "3rem", md: "4rem" },
            fontWeight: 900,
            lineHeight: 1.06,
            letterSpacing: "-0.04em",
            color: "#0f172a",
            fontFamily: "'Merriweather', Georgia, serif",
            maxWidth: 760,
            mb: 0.5,
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease 0.1s",
          }}
        >
          Where Skills Meet{" "}
          <Box
            component="span"
            sx={{
              background: "linear-gradient(90deg, #6366f1, #0891b2)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Opportunity
          </Box>
        </Typography>

        {/* Sub-headline */}
        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: "1.15rem", md: "1.5rem" },
            fontWeight: 700,
            color: "#334155",
            mb: 2,
            mt: 1,
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease 0.2s",
          }}
        >
          Workshops · Training & Placement · Final Year Projects
        </Typography>

        {/* Description */}
        <Typography
          sx={{
            fontSize: { xs: "1rem", md: "1.1rem" },
            color: "#475569",
            maxWidth: 640,
            lineHeight: 1.75,
            mb: { xs: 6, md: 8 },
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease 0.3s",
          }}
        >
          THAKSA Academy bridges the gap between academia and industry with immersive offline
          workshops, structured placement programs, and expert-guided final year projects — all
          designed to make you job-ready from day one.
        </Typography>

        {/* Module Cards */}
        <Box
          sx={{
            opacity: mounted ? 1 : 0,
            transition: "opacity 0.5s ease 0.4s",
          }}
        >
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: "0.78rem",
              color: "#64748b",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              mb: 2.5,
            }}
          >
            ⚡ Explore Our Programmes
          </Typography>
          <Grid container spacing={2.5}>
            {modules.map((mod, i) => (
              <AnimatedCard key={mod.id} module={mod} index={i} />
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
