import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  CircularProgress,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import InputAdornment from "@mui/material/InputAdornment";
import AuthLayout from "../auth/AuthLayout";
import {
  requestForgotPasswordOtp,
  verifyForgotPasswordOtp,
} from "../../services/userServices";
import useToast from "../../hooks/useToast";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await requestForgotPasswordOtp({ email });
      setOtpSent(true);
      showToast("OTP sent successfully. Please check your email.", "success");
    } catch (requestError) {
      setOtpSent(false);
      const errorMessage = requestError?.response?.data?.message || "Failed to send OTP";
      setError(errorMessage);
      showToast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp.trim()) {
      setError("OTP is required");
      return;
    }

    try {
      setOtpLoading(true);
      setError("");
      await verifyForgotPasswordOtp({ email, otp });
      setOtpVerified(true);
      showToast("OTP verified successfully.", "success");
      navigate("/update-password", { state: { email } });
    } catch (verifyError) {
      setOtpVerified(false);
      const errorMessage = verifyError?.response?.data?.message || "OTP verification failed";
      setError(errorMessage);
      showToast(errorMessage, "error");
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <AuthLayout onBackHome={() => navigate("/")}>
      <Typography variant="h5" component="h1" color="primary.main" gutterBottom>
        Reset your password
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Enter your email address and we&apos;ll send a password reset link.
      </Typography>

      <Stack component="form" onSubmit={handleRequestOtp} spacing={2.5}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          error={Boolean(error)}
          helperText={error}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailRoundedIcon color="action" />
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={loading}
          sx={{
            py: 1.35,
            background: "linear-gradient(to right, #2563eb, #0f766e)",
            boxShadow: "0 14px 30px rgba(37, 99, 235, 0.35)",
          }}
        >
          {loading ? <CircularProgress size={22} color="inherit" /> : "Send OTP"}
        </Button>
      </Stack>

      {otpSent ? (
        <Stack component="form" onSubmit={handleVerifyOtp} spacing={2.5} sx={{ mt: 3 }}>
          <TextField
            label="Enter OTP"
            type="text"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
              setError("");
            }}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={otpLoading || otpVerified}
            sx={{
              py: 1.35,
              background: "linear-gradient(to right, #0f766e, #2563eb)",
              boxShadow: "0 14px 30px rgba(15, 118, 110, 0.35)",
            }}
          >
            {otpLoading ? <CircularProgress size={22} color="inherit" /> : "Verify OTP"}
          </Button>
        </Stack>
      ) : null}

      <Link
        component="button"
        type="button"
        underline="hover"
        onClick={() => navigate("/login")}
        sx={{ mt: 3, fontWeight: 700, color: "primary.main" }}
      >
        Back to Login
      </Link>
    </AuthLayout>
  );
}
