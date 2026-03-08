import { Box, Container } from "@mui/material";
import HeroSection from "./sections/HeroSection";
import StatsSection from "./sections/StatsSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import InstructorSection from "./sections/InstructorSection";

export default function HomePage() {
  return (
    <Box
      sx={{
        background:
          "linear-gradient(180deg, #eef6ff 0%, #f8fbff 32%, #ffffff 58%, #f6fffb 100%)",
      }}
    >
      <HeroSection />
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <StatsSection />
        <InstructorSection />
        <TestimonialsSection />
      </Container>
    </Box>
  );
}
