import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import appTheme from "./theme/appTheme";
import ToastProvider from "./context/ToastProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <ToastProvider>
        <App />
      </ToastProvider>
    </ThemeProvider>
  </React.StrictMode>
);
