import { Box, Button, Container, Paper } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { ThemeProvider } from "@mui/material/styles";
import authTheme from "./authTheme";

export default function AuthLayout({ children, onBackHome, maxWidth = "sm" }) {
  return (
    <ThemeProvider theme={authTheme}>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          py: { xs: 4, md: 8 },
          background:
            "radial-gradient(circle at 10% 10%, #dbeafe 0%, #f5f9ff 45%, #e2e8f0 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -120,
            left: -120,
            width: 360,
            height: 360,
            borderRadius: "50%",
            background: "rgba(37, 99, 235, 0.14)",
            filter: "blur(90px)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -90,
            right: -90,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "rgba(15, 118, 110, 0.1)",
            filter: "blur(90px)",
          }}
        />

        <Container maxWidth={maxWidth} sx={{ position: "relative", zIndex: 1 }}>
          <Button
            startIcon={<ArrowBackRoundedIcon />}
            onClick={onBackHome}
            sx={{
              mb: 2,
              color: "text.secondary",
              "&:hover": { backgroundColor: "transparent", color: "primary.main" },
            }}
          >
            Back to Home
          </Button>

          <Paper
            elevation={0}
            sx={{
              border: "1px solid rgba(37, 99, 235, 0.14)",
              boxShadow: "0 24px 60px rgba(15, 23, 42, 0.12)",
              backdropFilter: "blur(8px)",
              background:
                "linear-gradient(160deg, rgba(255,255,255,0.96) 0%, rgba(248,250,252,0.92) 100%)",
              p: { xs: 3, sm: 5 },
            }}
          >
            {children}
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
