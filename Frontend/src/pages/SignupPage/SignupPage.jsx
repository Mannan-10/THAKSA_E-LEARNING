import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { register } from "../../services/userServices";
import AuthLayout from "../auth/AuthLayout";

export default function SignupPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      submit: "",
    }));
  };

  const validate = () => {
    const tempErrors = {};

    if (!formData.username.trim()) {
      tempErrors.username = "Username is required";
    }
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    }
    if (!formData.password.trim()) {
      tempErrors.password = "Password is required";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const data = await register(formData);
      const isExplicitFailure = data?.success === false || data?.status === "error";

      if (!isExplicitFailure) {
        navigate("/verify-otp", {
          state: {
            email: formData.email,
          },
        });
      } else {
        setErrors({
          submit: data?.message || "Signup failed",
        });
      }
    } catch (error) {
      console.error("Signup Error:", error);
      setErrors({
        submit: error?.response?.data?.message || "Server error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout onBackHome={() => navigate("/")}>
      <Typography
        variant="h4"
        component="h1"
        color="primary.main"
        textAlign="center"
        gutterBottom
      >
        Create Account
      </Typography>
      <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 4 }}>
        Start your learning journey with Thaksa.
      </Typography>

      <Stack component="form" onSubmit={handleSignup} spacing={2.5} noValidate>
        <TextField
          label="Full Name"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          error={Boolean(errors.username)}
          helperText={errors.username}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon color="action" />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={Boolean(errors.email)}
          helperText={errors.email}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon color="action" />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={Boolean(errors.password)}
          helperText={errors.password}
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

        {errors.submit ? <Alert severity="error">{errors.submit}</Alert> : null}

        <Button
          fullWidth
          type="submit"
          size="large"
          variant="contained"
          disabled={loading}
          sx={{
            py: 1.4,
            background: "linear-gradient(to right, #2563eb, #0f766e)",
            boxShadow: "0 14px 30px rgba(37, 99, 235, 0.35)",
            "&:hover": {
              background: "linear-gradient(to right, #1d4ed8, #0f766e)",
            },
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Get Started"}
        </Button>
      </Stack>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1}
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: 4 }}
      >
        <Typography variant="body2" color="text.secondary">
          Already have an account?{" "}
          <Link
            component="button"
            type="button"
            underline="hover"
            onClick={() => navigate("/login")}
            sx={{ fontWeight: 700, color: "primary.main" }}
          >
            Log in
          </Link>
        </Typography>

        <Link
          component="button"
          type="button"
          underline="hover"
          onClick={() => navigate("/forgot-password")}
          sx={{ color: "text.secondary", fontWeight: 600 }}
        >
          Forgot password?
        </Link>
      </Stack>
    </AuthLayout>
  );
}
