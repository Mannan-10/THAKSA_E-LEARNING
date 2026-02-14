import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Button,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { login } from "../../services/userServices";
import AuthLayout from "../auth/AuthLayout";
import useToast from "../../hooks/useToast";

export default function LoginPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
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
    }));
  };

  const validate = () => {
    const tempErrors = {};

    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    }
    if (!formData.password.trim()) {
      tempErrors.password = "Password is required";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const data = await login(formData);

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        if (data.user.role === "admin") {
          navigate("/admin");
        } else if (data.user.role === "instructor") {
          navigate("/instructor");
        } else {
          navigate("/dashboard");
        }
      } else {
        showToast(data.message || "Login failed", "error");
      }
    } catch (error) {
      console.error(error);
      showToast("Incorrect Password or Email.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout onBackHome={() => navigate("/")}>
      <Typography
        variant="h4"
        component="h1"
        fontWeight={800}
        color="primary.main"
        textAlign="center"
        gutterBottom
      >
        Welcome Back
      </Typography>
      <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 4 }}>
        Login to continue your learning journey.
      </Typography>

      <Stack component="form" onSubmit={handleLogin} spacing={2.5} noValidate>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailRoundedIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                  },
                }}
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                error={Boolean(errors.password)}
                helperText={errors.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockRoundedIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  mt: 2,
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: 700,
                  textTransform: "none",
                  background: "linear-gradient(to right, #2563eb, #4f46e5)",
                  boxShadow: "0 10px 25px rgba(37, 99, 235, 0.3)",
                  "&:hover": {
                    background: "linear-gradient(to right, #1d4ed8, #4338ca)",
                    boxShadow: "0 15px 35px rgba(37, 99, 235, 0.4)",
                  },
                }}
              >
                {loading ? "Logging in..." : "Login"}
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
          Don&apos;t have an account?{" "}
          <Link
            component="button"
            type="button"
            underline="hover"
            onClick={() => navigate("/signup")}
            sx={{ fontWeight: 700, color: "primary.main" }}
          >
            Sign up
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
