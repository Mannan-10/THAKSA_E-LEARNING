import { useEffect, useRef, useState } from "react";
import { Box, Chip, Container, Grid, Stack, Typography } from "@mui/material";
import tharunImg from "./cofounder-tharunkrishna.png";
import sadvishaImg from "./cto-sadvisha-reddy.png";

function useReveal(delay = 0) {
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

  return { ref, visible, delay };
}

function RevealBox({ children, delay = 0, direction = "up", sx = {} }) {
  const { ref, visible } = useReveal(delay);
  const transforms = {
    up: visible ? "translateY(0)" : "translateY(48px)",
    left: visible ? "translateX(0)" : "translateX(-56px)",
    right: visible ? "translateX(0)" : "translateX(56px)",
    fade: "none",
  };

  return (
    <Box
      ref={ref}
      sx={{
        opacity: visible ? 1 : 0,
        transform: transforms[direction],
        transition: `all 0.7s cubic-bezier(0.34,1.2,0.64,1) ${delay}ms`,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

function SectionLabel({ text, color = "#6366f1" }) {
  return (
    <Typography
      sx={{
        fontWeight: 800,
        fontSize: "0.75rem",
        color,
        textTransform: "uppercase",
        letterSpacing: "0.12em",
        mb: 1.5,
      }}
    >
      {text}
    </Typography>
  );
}

export default function InstructorSection() {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        mb: { xs: 6, md: 10 },
        background: "linear-gradient(135deg, #f3fffb 0%, #eef8ff 100%)",
        border: "1px solid rgba(15,23,42,0.08)",
        position: "relative",
        overflow: "hidden",
        borderRadius: { xs: 4, md: 5 },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -80,
          left: -80,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -60,
          right: -60,
          width: 250,
          height: 250,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(15,23,42,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg">
       
        <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={4}
              alignItems={{ xs: "center", sm: "flex-start" }}
            >
              <RevealBox direction="left" delay={0}>
                <Box sx={{ position: "relative", flexShrink: 0 }}>
                  <Box
                    sx={{
                      width: { xs: 160, md: 190 },
                      height: { xs: 160, md: 190 },
                      borderRadius: "50%",
                      background: "linear-gradient(135deg,#6366f1,#7c3aed)",
                      p: "4px",
                      animation: "floatBob 4s ease-in-out infinite",
                      "@keyframes floatBob": {
                        "0%,100%": { transform: "translateY(0px)" },
                        "50%": { transform: "translateY(-12px)" },
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={tharunImg}
                      alt="k. Tharun Krishna - CEO and Founder"
                      sx={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                        objectFit: "cover",
                        objectPosition: "top center",
                        border: "4px solid #fff",
                      }}
                    />
                  </Box>
                  <Chip
                    label="CEO and Founder"
                    size="small"
                    sx={{
                      position: "absolute",
                      bottom: 4,
                      left: "50%",
                      transform: "translateX(-50%)",
                      bgcolor: "#6366f1",
                      color: "#fff",
                      fontWeight: 900,
                      fontSize: "0.7rem",
                      whiteSpace: "nowrap",
                      boxShadow: "0 4px 12px rgba(99,102,241,0.4)",
                    }}
                  />
                </Box>
              </RevealBox>

              <RevealBox direction="up" delay={150}>
                <Box>
                  <Typography
                    noWrap
                    variant="h5"
                    sx={{
                      fontWeight: 900,
                      color: "#0f172a",
                      mb: 0.5,
                      fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    K. Tharunkrishna
                  </Typography>
                  <Typography
                    sx={{
                      color: "#6366f1",
                      fontWeight: 700,
                      fontSize: "0.88rem",
                      mb: 1.5,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    CEO AND fOUNDER
                  </Typography>
                  <Typography sx={{ color: "#475569", lineHeight: 1.75, fontSize: "1.1rem" }}>
                    Tharun is a passionate educator and tech entrepreneur with over 5 years of
                    experience bridging academia and industry. His vision sparked THAKSA Academy to
                    transform how students learn practical skills through immersive, industry-led
                    workshops.
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                    {["Educator", "Technologist", "Mentor"].map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={{
                          bgcolor: "rgba(99,102,241,0.1)",
                          color: "#6366f1",
                          fontWeight: 700,
                          fontSize: "0.72rem",
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
              </RevealBox>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={4}
              alignItems={{ xs: "center", sm: "flex-start" }}
            >
              <RevealBox direction="left" delay={200}>
                <Box sx={{ position: "relative", flexShrink: 0 }}>
                  <Box
                    sx={{
                      width: { xs: 160, md: 190 },
                      height: { xs: 160, md: 190 },
                      borderRadius: "50%",
                      background: "linear-gradient(135deg,#0f766e,#0891b2)",
                      p: "4px",
                      animation: "floatBob2 4s ease-in-out infinite 0.8s",
                      "@keyframes floatBob2": {
                        "0%,100%": { transform: "translateY(0px)" },
                        "50%": { transform: "translateY(-12px)" },
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={sadvishaImg}
                      alt="Sadvisha Reddy - CTO"
                      sx={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                        objectFit: "cover",
                        objectPosition: "top",
                        border: "4px solid #fff",
                      }}
                    />
                  </Box>
                  <Chip
                    label="CTO"
                    size="small"
                    sx={{
                      position: "absolute",
                      bottom: 4,
                      left: "50%",
                      transform: "translateX(-50%)",
                      bgcolor: "#0f766e",
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: "0.7rem",
                      boxShadow: "0 4px 12px rgba(15,118,110,0.4)",
                    }}
                  />
                </Box>
              </RevealBox>

              <RevealBox direction="up" delay={300}>
                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 900,
                      color: "#0f172a",
                      mb: 0.5,
                      fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    Sadvisha Reddy
                  </Typography>
                  <Typography
                    sx={{
                      color: "#0f766e",
                      fontWeight: 700,
                      fontSize: "0.88rem",
                      mb: 1.5,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    CTO - CHIEF TECHNICAL OFFICER
                  </Typography>
                  <Typography sx={{ color: "#475569", lineHeight: 1.75, fontSize: "0.95rem" }}>
                    Sadvisha leads the technical direction of THAKSA Academy, building scalable
                    learning infrastructure and curating workshop curricula that stay ahead of
                    industry trends. Her deep expertise in software architecture empowers students
                    with cutting-edge skills.
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                    {["Full-Stack", "AI/ML", "Systems"].map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={{
                          bgcolor: "rgba(15,118,110,0.1)",
                          color: "#0f766e",
                          fontWeight: 700,
                          fontSize: "0.72rem",
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
              </RevealBox>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
