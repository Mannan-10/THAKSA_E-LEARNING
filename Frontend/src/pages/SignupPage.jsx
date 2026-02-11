import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/userServices";
import {Box, CircularProgress ,TextField, Button, InputAdornment, IconButton, Typography} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";


export default function SignupPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }))
  };

  const validate = () => {
    let tempErrors = {};

    if (!formData.username) {
      tempErrors.username = "Username is required";
    }
    if (!formData.email) {
      tempErrors.email = "Email is required";
    }
    if (!formData.password) {
      tempErrors.password = "Password is required";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  }

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const data = await register(formData);
      console.log("REGISTER RESPONSE:", data);

      if (data.success) {
        navigate("/verify-otp", {
          state: {
            email: formData.email,
          },
        });
      } else {
        alert(data.message || "Signup failed");
      }

    } catch (error) {
      console.error("Signup Error:", error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{minHeight: "100vh"}}>
    <div style={containerStyle}>
      <button onClick={() => navigate("/")} style={backBtn}>
        ← Back
      </button>

      <div style={cardStyle}>
        <Typography variant="h5" align="center" mb={1} fontWeight="bold">
          Create Account
        </Typography>
        <Typography align="center" color="text.secondary" mb={3}>
          Start your learning journey with Thaksa
        </Typography>

        <form onSubmit={handleSignup}>
          <TextField
            fullWidth
            margin="normal"
            label="Full Name"
            type="text"
            name="username"
            placeholder="Full Name"
            value={formData.username}
            onChange={handleChange}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon color="action" />
                </InputAdornment>
              )
            }}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="action" />
                </InputAdornment>
              )
            }}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <Button fullWidth type="submit" sx={{
            mt: 3,
            py: 1.3,
            fontWeight: "bold",
            borderRadius: 2,
            textTransform: "none",
            background: "linear-gradient(45deg, #1976d2, #42a5f5)",
            color: "white",
            boxShadow: "none",
            padding: "14px",
            "&:hover": {
              background: "linear-gradient(45deg, #1565c0, #1e88e5)",
            },
          }}
          disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" />: "Get Started"}
          </Button>
        </form>

        <div style={footerLinks}>
          <span>
            Already have an account?{" "}
            <Button
              onClick={() => navigate("/login")}
              style={linkBtn}
              sx={{textTransform: "none"}}
              type="button"
            >
              Log in
            </Button>
          </span>

          <Button
            onClick={() => navigate("/forgot-password")}
            style={forgotBtn}
            sx={{textTransform: "none"}}
            type="button"
          >
            Forgot password?
          </Button>
        </div>
      </div>
    </div>
    </Box>
  );
}

const containerStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f8fafc",
  position: "relative",
};

const cardStyle = {
  background: "#ffffff",
  padding: "40px",
  borderRadius: "16px",
  width: "100%",
  maxWidth: "420px",
  boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
};

const backBtn = {
  position: "absolute",
  top: "24px",
  left: "24px",
  background: "transparent",
  border: "none",
  fontSize: "20px",
  cursor: "pointer",
  color: "#2563eb",
  fontWeight: "600",
};

const primaryBtn = {
  width: "100%",
  background: "#2563eb",
  color: "white",
  padding: "14px",
  borderRadius: "12px",
  border: "none",
  fontWeight: "600",
  cursor: "pointer",
};

const footerLinks = {
  marginTop: "20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "14px",
  color: "#475569",
};

const linkBtn = {
  background: "none",
  border: "none",
  color: "#2563eb",
  fontWeight: "600",
  cursor: "pointer",
  padding: 0,
};

const forgotBtn = {
  background: "none",
  border: "none",
  color: "#64748b",
  fontSize: "14px",
  cursor: "pointer",
  padding: 0,
};


