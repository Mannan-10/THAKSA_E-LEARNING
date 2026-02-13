import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let authTheme = createTheme({
  palette: {
    primary: {
      main: "#2563eb",
      dark: "#1d4ed8",
      light: "#60a5fa",
    },
    secondary: {
      main: "#0f766e",
    },
    background: {
      default: "#f5f9ff",
      paper: "#ffffff",
    },
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily: "'IBM Plex Sans', 'Trebuchet MS', 'Segoe UI', sans-serif",
    fontSize: 17,
    body1: {
      fontSize: "1.05rem",
      lineHeight: 1.75,
    },
    body2: {
      fontSize: "0.98rem",
      lineHeight: 1.7,
    },
    h4: {
      fontFamily: "'Merriweather', Georgia, serif",
      fontWeight: 800,
      letterSpacing: "-0.02em",
    },
    h5: {
      fontFamily: "'Merriweather', Georgia, serif",
      fontWeight: 800,
      letterSpacing: "-0.02em",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 24,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        fullWidth: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: "none",
          fontWeight: 700,
        },
      },
    },
  },
});

authTheme = responsiveFontSizes(authTheme);

export default authTheme;
