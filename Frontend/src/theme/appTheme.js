import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const bodyFont = "'IBM Plex Sans', 'Trebuchet MS', 'Segoe UI', sans-serif";
const headingFont = "'Merriweather', Georgia, serif";

let appTheme = createTheme({
  typography: {
    fontFamily: bodyFont,
    fontSize: 17,
    h1: { fontFamily: headingFont, fontWeight: 800, letterSpacing: "-0.01em" },
    h2: { fontFamily: headingFont, fontWeight: 800, letterSpacing: "-0.01em" },
    h3: { fontFamily: headingFont, fontWeight: 800, letterSpacing: "-0.01em" },
    h4: { fontFamily: headingFont, fontWeight: 800, letterSpacing: "-0.01em" },
    h5: { fontFamily: headingFont, fontWeight: 800, letterSpacing: "-0.01em" },
    h6: { fontFamily: headingFont, fontWeight: 800, letterSpacing: "-0.01em" },
    body1: { fontSize: "1.06rem", lineHeight: 1.75 },
    body2: { fontSize: "0.98rem", lineHeight: 1.7 },
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
