import { Box, Container, Stack, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 8,
        borderTop: "1px solid rgba(15, 23, 42, 0.1)",
        background:
          "linear-gradient(180deg, rgba(248,250,252,0.92) 0%, rgba(241,245,249,0.96) 100%)",
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 4 } }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "center", sm: "flex-start" }}
          spacing={1.2}
          textAlign={{ xs: "center", sm: "left" }}
        >
          <Typography sx={{ fontWeight: 800, color: "#0f172a" }}>Thaksa E-Learning</Typography>
          <Typography sx={{ color: "#475569", fontSize: { xs: "0.875rem", sm: "1rem" } }}>
            Copyright {new Date().getFullYear()} Thaksa. All rights reserved.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
