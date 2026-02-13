import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Alert,
  Button,
  Stack,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import AuthLayout from "../auth/AuthLayout";
import { verifyOtp } from "../../services/userServices";

export default function VerifyOtpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await verifyOtp({ email, otp });
      alert("OTP verified successfully!");
      navigate("/login");
    } catch (requestError) {
      setError(requestError?.response?.data?.message || "Invalid OTP");
    }
  };

  if (!email) {
    return (
      <AuthLayout onBackHome={() => navigate("/")} maxWidth="xs">
        <Alert severity="warning" sx={{ mb: 2 }}>
          Email not found. Please register again.
        </Alert>
        <Button variant="contained" onClick={() => navigate("/signup")}>
          Go to Signup
        </Button>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout onBackHome={() => navigate("/")} maxWidth="xs">
      <Typography variant="h5" component="h1" color="primary.main" gutterBottom>
        Verify OTP
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Enter the OTP sent to {email}
      </Typography>

      <Stack component="form" onSubmit={handleVerify} spacing={2.5}>
        <TextField
          label="OTP Code"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />

        {error ? <Alert severity="error">{error}</Alert> : null}

        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{
            py: 1.35,
            background: "linear-gradient(to right, #2563eb, #0f766e)",
            boxShadow: "0 14px 30px rgba(37, 99, 235, 0.35)",
          }}
        >
          Verify
        </Button>
      </Stack>

      <Link
        component="button"
        type="button"
        underline="hover"
        onClick={() => navigate("/signup")}
        sx={{ mt: 3, fontWeight: 700, color: "primary.main" }}
      >
        Back to Signup
      </Link>
    </AuthLayout>
  );
}
