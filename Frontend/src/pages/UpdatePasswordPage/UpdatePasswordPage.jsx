import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";
import AuthLayout from "../auth/AuthLayout";
import { resetPasswordWithOtp } from "../../services/userServices";

export default function UpdatePasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "", submit: "" }));
  };

  const validate = () => {
    const tempErrors = {};
    if (!formData.newPassword.trim()) {
      tempErrors.newPassword = "New password is required";
    }
    if (!formData.confirmPassword.trim()) {
      tempErrors.confirmPassword = "Please confirm password";
    }
    if (
      formData.newPassword.trim() &&
      formData.confirmPassword.trim() &&
      formData.newPassword !== formData.confirmPassword
    ) {
      tempErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      await resetPasswordWithOtp({
        email,
        newPassword: formData.newPassword,
      });
      alert("Password updated successfully. Please log in.");
      navigate("/login");
    } catch (error) {
      setErrors({
        submit: error?.response?.data?.message || "Unable to update password",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return (
      <AuthLayout onBackHome={() => navigate("/")}>
        <Alert severity="warning" sx={{ mb: 2 }}>
          Session expired. Please request OTP again.
        </Alert>
        <Button variant="contained" onClick={() => navigate("/forgot-password")}>
          Go to Forgot Password
        </Button>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout onBackHome={() => navigate("/")}>
      <Typography variant="h5" component="h1" color="primary.main" gutterBottom>
        Update Password
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Set a new password for {email}
      </Typography>

      <Stack component="form" onSubmit={handleSubmit} spacing={2.5} noValidate>
        <TextField
          label="New Password"
          name="newPassword"
          type={showPassword ? "text" : "password"}
          value={formData.newPassword}
          onChange={handleChange}
          error={Boolean(errors.newPassword)}
          helperText={errors.newPassword}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type={showPassword ? "text" : "password"}
          value={formData.confirmPassword}
          onChange={handleChange}
          error={Boolean(errors.confirmPassword)}
          helperText={errors.confirmPassword}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon color="action" />
              </InputAdornment>
            ),
          }}
        />

        {errors.submit ? <Alert severity="error">{errors.submit}</Alert> : null}

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
          {loading ? <CircularProgress size={22} color="inherit" /> : "Update Password"}
        </Button>
      </Stack>
    </AuthLayout>
  );
}
