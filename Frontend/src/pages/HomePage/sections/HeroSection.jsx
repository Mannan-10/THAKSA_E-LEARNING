import { Box, Button, Card, Chip, Container, Grid, IconButton, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const modules = [
  {
    id: "training",
    icon: WorkspacePremiumRoundedIcon,
    title: "Training",
    subtitle: "Structured Program",
    description:
      "Step-by-step training in aptitude, technical skills, and communication with regular mentor reviews and practice tasks.",
    color: "#0f766e",
    gradient: "linear-gradient(135deg, #0f766e 0%, #0891b2 100%)",
    bgGlow: "rgba(15,118,110,0.12)",
    borderColor: "rgba(15,118,110,0.25)",
    route: "/training",
    tag: "Structured training sessions",
    tagColor: "#0f766e",
    tagBg: "rgba(15,118,110,0.1)",
    whoFor: "Students and fresh graduates building core skills",
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
    <Grid
      ref={ref}
      sx={{
        minWidth: { xs: "86vw", sm: "46vw", md: "32vw", lg: "24vw" },
        maxWidth: { xs: "86vw", sm: "46vw", md: "32vw", lg: "24vw" },
        scrollSnapAlign: "start",
        flexShrink: 0,
      }}
    >
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
            ? `0 28px 56px ${module.bgGlow}, 0 12px 26px rgba(15,23,42,0.12)`
            : "0 4px 16px rgba(15,23,42,0.05)",
          transform: visible
            ? hovered ? "translateY(-10px) scale(1.018)" : "translateY(0) scale(1)"
            : "translateY(40px) scale(0.97)",
          opacity: visible ? 1 : 0,
          transition: `all 0.45s cubic-bezier(0.22,0.61,0.36,1) ${index * 120}ms`,
          position: "relative",
          overflow: "hidden",
          p: { xs: 2.6, sm: 3, md: 3.2 },
          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            borderRadius: 4,
            border: `1.5px solid ${module.borderColor}`,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.35s ease",
            pointerEvents: "none",
          },
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
            opacity: hovered ? 0.2 : 0.07,
            filter: hovered ? "blur(26px)" : "blur(30px)",
            transform: hovered ? "scale(1.08)" : "scale(1)",
            transition: "all 0.35s ease",
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
            transform: hovered ? "translateY(-2px) rotate(-4deg)" : "translateY(0) rotate(0deg)",
            transition: "transform 0.35s ease",
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
            fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif",
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
        <Typography sx={{ color: "#475569", fontSize: { xs: "0.9rem", md: "0.92rem" }, lineHeight: 1.6, mb: 2.5 }}>
          {module.description}
        </Typography>
        <Typography sx={{ color: "#334155", fontSize: "0.86rem", mb: 2.2 }}>
          <Box component="span" sx={{ fontWeight: 700 }}>Who it's for:</Box> {module.whoFor}
        </Typography>

        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: module.color }}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "0.88rem",
              transform: hovered ? "translateX(1px)" : "translateX(0)",
              transition: "transform 0.25s ease",
            }}
          >
            Learn More
          </Typography>
          <ArrowForwardRoundedIcon
            sx={{
              fontSize: 18,
              transform: hovered ? "translateX(6px)" : "translateX(0)",
              transition: "transform 0.25s ease",
            }}
          />
        </Stack>
      </Card>
    </Grid>
  );
}

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const programsRef = useRef(null);
  const cardsScrollerRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const scroller = cardsScrollerRef.current;
    if (!scroller) return;

    const updateScrollState = () => {
      const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth - 1;
      setCanScrollLeft(scroller.scrollLeft > 0);
      setCanScrollRight(scroller.scrollLeft < maxScrollLeft);
    };

    updateScrollState();
    scroller.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      scroller.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const scrollToPrograms = () => {
    if (!programsRef.current) return;
    const top = programsRef.current.getBoundingClientRect().top + window.scrollY - 88;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const scrollProgramsBy = (direction) => {
    if (!cardsScrollerRef.current) return;
    const amount = Math.min(cardsScrollerRef.current.clientWidth * 0.86, 420);
    cardsScrollerRef.current.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(135deg, #eef5ff 0%, #f5efff 55%, #fffdf8 100%)",
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
            "radial-gradient(circle at 12% 12%, rgba(37,99,235,0.08) 0%, transparent 42%), radial-gradient(circle at 88% 84%, rgba(15,23,42,0.05) 0%, transparent 46%)",
          pointerEvents: "none",
        }}
      />

      {/* Subtle grid pattern */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(15,23,42,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.018) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative" }}>
        {/* ── Top row: text content + logo ── */}
        <Grid container spacing={4} alignItems="center"
          sx={{ mb: { xs: 0, md: 0 } }}
        >
          {/* TEXT COLUMN */}
          <Grid size={{ xs: 12, md: 7 }}>
            {/* Mobile logo - shown only on small screens, above the badge */}
            {isMobile && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mb: 3,
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "scale(1)" : "scale(0.85)",
                  transition: "all 0.6s ease",
                }}
              >
                <Box
                  component="img"
                  src={new URL("./logo.jpeg", import.meta.url).href}
                  alt="SkillForge Academy Logo"
                  sx={{
                    width: { xs: 120, sm: 150 },
                    height: { xs: 120, sm: 150 },
                    objectFit: "contain",
                    borderRadius: 4,
                  boxShadow: "0 12px 32px rgba(15,23,42,0.12)",
                    border: "1px solid rgba(15,23,42,0.12)",
                    background: "#fff",
                  }}
                />
              </Box>
            )}

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
                SkillForge Academy | Skill-first learning
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
                fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif",
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
                  color: "#1d4ed8",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "currentColor",
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
              Structured Training & Placement Support
            </Typography>

            {/* Description */}
            <Typography
              sx={{
                fontSize: { xs: "1rem", md: "1.1rem" },
                color: "#475569",
                maxWidth: 560,
                lineHeight: 1.75,
                mb: { xs: 3.5, md: 4.5 },
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.6s ease 0.3s",
              }}
            >
              Learn practical skills with guided mentors, structured sessions, and clear support
              from learning to placement preparation.
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.8}
              sx={{
                mb: { xs: 4.5, md: 6.5 },
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(16px)",
                transition: "all 0.6s ease 0.35s",
              }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/contact")}
                sx={{
                  textTransform: "none",
                  fontWeight: 800,
                  px: 3,
                  py: 1.2,
                  borderRadius: 2.5,
                  bgcolor: "#2563eb",
                  "&:hover": { bgcolor: "#1d4ed8" },
                }}
              >
                Talk to Advisor
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={scrollToPrograms}
                sx={{
                  textTransform: "none",
                  fontWeight: 800,
                  px: 3,
                  py: 1.2,
                  borderRadius: 2.5,
                  borderColor: "rgba(15,23,42,0.24)",
                  color: "#0f172a",
                  "&:hover": {
                    borderColor: "rgba(37,99,235,0.5)",
                    bgcolor: "rgba(37,99,235,0.05)",
                  },
                }}
              >
                View Programs
              </Button>
            </Stack>
          </Grid>

          {/* LOGO COLUMN - desktop only */}
          <Grid
            size={{ xs: 12, md: 5 }}
            sx={{ display: { xs: "none", md: "flex" }, justifyContent: "center", alignItems: "center" }}
          >
            <Box
              sx={{
                position: "relative",
                opacity: mounted ? 1 : 0,
                transform: mounted ? "scale(1) translateY(0)" : "scale(0.85) translateY(20px)",
                transition: "all 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.25s",
              }}
            >
              {/* Decorative glow ring behind logo */}
              <Box
                sx={{
                  position: "absolute",
                  inset: -24,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(37,99,235,0.1) 0%, transparent 70%)",
                  filter: "blur(20px)",
                  pointerEvents: "none",
                }}
              />
              <Box
                component="img"
                src={new URL("./logo.jpeg", import.meta.url).href}
                alt="SkillForge Academy Logo"
                sx={{
                  width: { md: 280, lg: 340 },
                  height: { md: 280, lg: 340 },
                  objectFit: "contain",
                  borderRadius: 6,
                  boxShadow: "0 20px 48px rgba(15,23,42,0.14)",
                  border: "1px solid rgba(15,23,42,0.12)",
                  background: "#fff",
                  position: "relative",
                }}
              />
            </Box>
          </Grid>
        </Grid>

        {/* Module Cards */}
        <Box
          ref={programsRef}
          id="home-programs"
          sx={{
            opacity: mounted ? 1 : 0,
            transition: "opacity 0.5s ease 0.4s",
            scrollMarginTop: "90px",
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
            Explore Our Programs
          </Typography>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 1.8 }}
          >
            <Typography sx={{ color: "#475569", fontSize: "0.9rem", fontWeight: 600 }}>
              Choose a path and explore details.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton
                onClick={() => scrollProgramsBy("left")}
                disabled={!canScrollLeft}
                sx={{
                  width: 38,
                  height: 38,
                  border: "1px solid rgba(15,23,42,0.16)",
                  bgcolor: "#fff",
                  color: "#0f172a",
                  "&:hover": { bgcolor: "rgba(15,23,42,0.04)" },
                  "&.Mui-disabled": { opacity: 0.35, borderColor: "rgba(15,23,42,0.12)" },
                }}
              >
                <ChevronLeftRoundedIcon />
              </IconButton>
              <IconButton
                onClick={() => scrollProgramsBy("right")}
                disabled={!canScrollRight}
                sx={{
                  width: 38,
                  height: 38,
                  border: "1px solid rgba(15,23,42,0.16)",
                  bgcolor: "#fff",
                  color: "#0f172a",
                  "&:hover": { bgcolor: "rgba(15,23,42,0.04)" },
                  "&.Mui-disabled": { opacity: 0.35, borderColor: "rgba(15,23,42,0.12)" },
                }}
              >
                <ChevronRightRoundedIcon />
              </IconButton>
            </Stack>
          </Stack>
          <Grid
            ref={cardsScrollerRef}
            container
            wrap="nowrap"
            sx={{
              gap: { xs: 2, md: 2.5 },
              overflowX: "auto",
              overflowY: "hidden",
              pb: 1,
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "thin",
              "&::-webkit-scrollbar": {
                height: 8,
              },
              "&::-webkit-scrollbar-track": {
                background: "rgba(15,23,42,0.06)",
                borderRadius: 999,
              },
              "&::-webkit-scrollbar-thumb": {
                background: "rgba(51,65,85,0.35)",
                borderRadius: 999,
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "rgba(51,65,85,0.5)",
              },
            }}
          >
            {modules.map((mod, i) => (
              <AnimatedCard key={mod.id} module={mod} index={i} />
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}



