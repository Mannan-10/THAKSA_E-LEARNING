import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../services/userServices";
import { TextField, Button, InputAdornment, IconButton, Box,} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

export default function LoginPage() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData(
      {
        ...formData,
        [e.target.name]: e.target.value,
      },
    )
  }

  const validate = () => {
    let tempErrors = {};
    if (!formData.email) {
      tempErrors.email = "Email is required";
    }
    if (!formData.password) {
      tempErrors.password = "Password is required";
    }
    setError(tempErrors);
    return Object.keys(tempErrors).length === 0;
  }

  const handleLogin = async(e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = await login(formData)

      console.log("LOGIN RESPONSE:", data);

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
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during login.");
    }
    finally {
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
        <h2>Welcome Back</h2>
        <p style={{ color: "#64748b" }}>
          Login to continue your learning journey
        </p>

        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            InputProps={{
              startAdornment:(
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
            required
            value={formData.password}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="action"/>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}

          />

          <Button type="submit" style={primaryBtn} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div style={footerLinks}>
          <span>
            Don’t have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              style={linkBtn}
              type="button"
            >
              Sign up
            </button>
          </span>

          <button
            onClick={() => navigate("/forgot-password")}
            style={forgotBtn}
            type="button"
          >
            Forgot password?
          </button>
        </div>
      </div>
    </div>
    </Box>
  );
}

/* ===== STYLES ===== */

const containerStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f8fafc",
  position: "relative",
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

const cardStyle = {
  background: "#ffffff",
  padding: "40px",
  borderRadius: "16px",
  width: "100%",
  maxWidth: "420px",
  boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
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
