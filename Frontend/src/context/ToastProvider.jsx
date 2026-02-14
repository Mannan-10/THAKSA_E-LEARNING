import { useCallback, useMemo, useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import ToastCtx from "./toastCtx";

export default function ToastProvider({ children }) {
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "info",
    duration: 3000,
  });

  const showToast = useCallback((message, severity = "info", duration = 3000) => {
    setToast({
      open: true,
      message,
      severity,
      duration,
    });
  }, []);

  const closeToast = useCallback(() => {
    setToast((prev) => ({ ...prev, open: false }));
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastCtx.Provider value={value}>
      {children}
      <Snackbar
        open={toast.open}
        autoHideDuration={toast.duration}
        onClose={closeToast}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={toast.severity} onClose={closeToast} variant="filled" sx={{ width: "100%" }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </ToastCtx.Provider>
  );
}
