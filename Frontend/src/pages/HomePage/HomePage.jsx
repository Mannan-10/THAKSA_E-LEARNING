import { Box, Container } from "@mui/material";
import HeroSection from "./sections/HeroSection";
import TrustStripSection from "./sections/TrustStripSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import InstructorSection from "./sections/InstructorSection";

export default function HomePage() {
  return (
    <Box
      sx={{
        background:
          "linear-gradient(180deg, #f8fbff 0%, #fffefb 45%, #f7fcff 100%)",
      }}
    >
      <HeroSection />
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <TrustStripSection />
        <InstructorSection />
        <TestimonialsSection />
      </Container>
    </Box>
  );
}
