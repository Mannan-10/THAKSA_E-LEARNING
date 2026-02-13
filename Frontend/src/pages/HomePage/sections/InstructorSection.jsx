import {
  Box,
  Chip,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import coFounderImage from "./cofounder-tharunkrishna.png";

export default function InstructorSection() {
  return (
    <Box sx={{ mb: { xs: 6, md: 10 } }}>
      <Stack spacing={1.5} alignItems="center" textAlign="center" sx={{ mb: 4.5 }}>
        <Chip
          label="Master Trainer and Co-Founder"
          sx={{
            bgcolor: "rgba(37, 99, 235, 0.12)",
            color: "#1d4ed8",
            fontWeight: 700,
          }}
        />
        <Typography
          variant="h4"
          sx={{
            fontWeight: 900,
            color: "#0f172a",
            fontFamily: "'Merriweather', Georgia, serif",
            fontSize: { xs: "1.9rem", md: "2.5rem" },
            lineHeight: 1.2,
          }}
        >
          Learn From an Industry-Seasoned Mentor
        </Typography>
      </Stack>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 4.5 },
          borderRadius: 4,
          border: "1px solid rgba(15, 23, 42, 0.1)",
          background:
            "linear-gradient(160deg, rgba(255,255,255,0.97) 0%, rgba(248,250,252,0.94) 100%)",
        }}
      >
        <Stack direction={{ xs: "column", md: "row" }} spacing={{ xs: 3, md: 5 }}>
          <Box sx={{ minWidth: { md: 320 } }}>
            <Stack spacing={2} alignItems={{ xs: "center", md: "flex-start" }}>
              <Box
                component="img"
                src={coFounderImage}
                alt="TharunKrishna Kaithoju, Co-Founder and Instructor"
                onError={(e) => {
                  e.currentTarget.src = "/trainer.jpg";
                }}
                sx={{
                  width: { xs: 220, md: 260 },
                  height: { xs: 300, md: 350 },
                  objectFit: "cover",
                  objectPosition: "center top",
                  borderRadius: 3,
                  border: "4px solid rgba(37, 99, 235, 0.14)",
                  boxShadow: "0 16px 32px rgba(15, 23, 42, 0.18)",
                }}
              />
              <Box textAlign={{ xs: "center", md: "left" }}>
                <Typography variant="h5" sx={{ fontWeight: 800, color: "#0f172a" }}>
                  TharunKrishna Kaithoju
                </Typography>
                <Typography sx={{ color: "#475569", fontWeight: 600, mt: 0.5, fontSize: "1.05rem" }}>
                  Senior DevOps, Cloud, Data and ML Instructor
                </Typography>
              </Box>
              <Stack direction="row" spacing={1.2} flexWrap="wrap" useFlexGap>
                <Link
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                  underline="none"
                  sx={socialLinkSx}
                >
                  LinkedIn
                </Link>
                <Link
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                  underline="none"
                  sx={socialLinkSx}
                >
                  Instagram
                </Link>
                <Link href="mailto:trainer@email.com" underline="none" sx={socialLinkSx}>
                  Email
                </Link>
              </Stack>
            </Stack>
          </Box>

          <Box>
            <Typography sx={paragraphSx}>
              A senior industry professional with extensive hands-on experience
              in{" "}
              <Box component="span" sx={{ fontWeight: 700, color: "#0f172a" }}>
                AWS Cloud, DevOps engineering, CI/CD automation, Infrastructure as
                Code, Data Science, Machine Learning, MLOps, and Selenium-based
                testing frameworks
              </Box>
              .
            </Typography>

            <Typography sx={paragraphSx}>
              Over the years, he has trained and mentored students and working
              professionals through long-term, structured programs focused on
              real-world problem solving, production-level practices, and
              industry-aligned workflows, not surface-level tooling.
            </Typography>

            <Typography sx={paragraphSx}>
              His teaching philosophy is rooted in discipline and realism. He
              does not believe in grand promises or shortcuts. Instead, he
              focuses on understanding each student&apos;s mindset, strengthening
              fundamentals, and guiding them through a clear, achievable roadmap
              toward sustainable career growth.
            </Typography>

            <Typography sx={{ ...paragraphSx, mb: 0 }}>
              With a strong commitment to empowering motivated youth, his
              mission is to use every available resource today in a structured
              and focused way, helping students unlock their potential, build
              confidence, and create meaningful futures in technology.
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}

const paragraphSx = {
  fontSize: { xs: "1.05rem", md: "1.13rem" },
  lineHeight: 1.9,
  color: "#334155",
  mb: 2.2,
};

const socialLinkSx = {
  fontSize: "0.95rem",
  fontWeight: 700,
  color: "#2563eb",
  px: 1.6,
  py: 0.9,
  borderRadius: 2,
  border: "1px solid #bfdbfe",
  "&:hover": {
    bgcolor: "rgba(37, 99, 235, 0.08)",
  },
};
