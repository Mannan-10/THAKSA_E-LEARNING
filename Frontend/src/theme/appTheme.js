import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const bodyFont = "'Plus Jakarta Sans', 'Segoe UI', system-ui, sans-serif";
const headingFont = "'Sora', 'Plus Jakarta Sans', sans-serif";

let appTheme = createTheme({
  typography: {
    fontFamily: bodyFont,
    fontSize: 16,
    h1: { fontFamily: headingFont, fontWeight: 800, letterSpacing: "-0.02em" },
    h2: { fontFamily: headingFont, fontWeight: 800, letterSpacing: "-0.02em" },
    h3: { fontFamily: headingFont, fontWeight: 700, letterSpacing: "-0.01em" },
    h4: { fontFamily: headingFont, fontWeight: 700, letterSpacing: "-0.01em" },
    h5: { fontFamily: headingFont, fontWeight: 700 },
    h6: { fontFamily: headingFont, fontWeight: 700 },
    body1: { fontSize: "1.05rem", lineHeight: 1.75 },
    body2: { fontSize: "0.95rem", lineHeight: 1.7 },
    button: { fontWeight: 700 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: bodyFont,
          color: "#0f172a",
          backgroundColor: "#ffffff",
        },
      },
    },
  },
});

appTheme = responsiveFontSizes(appTheme);

export default appTheme;
