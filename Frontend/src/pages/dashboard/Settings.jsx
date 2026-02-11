import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../services/userServices";
import {
  IconButton,
  InputAdornment,
  OutlinedInput,
  FormControl,
  InputLabel,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";

export default function Settings() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const togglePassword = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const [error, setError] = useState({});

  const handleLogout = async () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });

    setError({
      ...error,
      [e.target.name]: "",
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = "New password must be at least 6 characters";
    }

    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (passwordData.confirmPassword !== passwordData.newPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updatePassword = async () => {
    setSuccess("");
    if (!validate()) return;

    try {
      setLoading(true);

      await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      setSuccess("Password updated successfully");
      alert("Password updated successfully");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  const handleManageNotifications = () => {
    alert("Manage notifications feature coming soon!");
  };

  return (
    <div>
      <h1 style={title}>Settings</h1>
      <p style={subtitle}>Manage your account preferences</p>

      <div style={card}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Current Password</InputLabel>
          <OutlinedInput
            type={showPassword.current ? "text" : "password"}
            name="currentPassword"
            value={passwordData.currentPassword}
            onChange={handlePasswordChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => togglePassword("current")}
                  edge="end"
                >
                  {showPassword.current ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Current Password"
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>New Password</InputLabel>
          <OutlinedInput
            type={showPassword.new ? "text" : "password"}
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => togglePassword("new")} edge="end">
                  {showPassword.new ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="New Password"
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Confirm Password</InputLabel>
          <OutlinedInput
            type={showPassword.confirm ? "text" : "password"}
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => togglePassword("confirm")}
                  edge="end"
                >
                  {showPassword.confirm ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm Password"
          />
        </FormControl>

        {error.api && <p style={errorText}>{error.api}</p>}
        {success && <p style={successText}>{success}</p>}

        <Button
          style={{ ...saveBtn, width: "100%" }}
          onClick={updatePassword}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Password"}
        </Button>
        
        <button style={actionBtn} onClick={handleManageNotifications}>
          Manage Notifications
        </button>
      </div>

      <div style={card}>
        <h3 style={sectionTitle}>Security</h3>
        <p style={muted}>Last login: Today · Chrome · India</p>

        <button style={dangerBtn}>Logout from all devices</button>
      </div>

      <div style={card}>
        <h3 style={sectionTitle}>Session</h3>
        <button onClick={handleLogout} style={logoutBtn} disabled={loading}>
          {loading ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  );
}

const title = {
  fontSize: "28px",
  fontWeight: "800",
  marginBottom: "6px",
};

const subtitle = {
  color: "#64748b",
  marginBottom: "32px",
};

const card = {
  background: "white",
  padding: "24px",
  borderRadius: "16px",
  marginBottom: "24px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
};

const sectionTitle = {
  fontSize: "18px",
  fontWeight: "700",
  marginBottom: "12px",
};

const actionBtn = {
  display: "block",
  width: "100%",
  textAlign: "left",
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid #e5e7eb",
  background: "#f8fafc",
  cursor: "pointer",
  marginBottom: "10px",
  fontWeight: "500",
};

const dangerBtn = {
  display: "block",
  width: "100%",
  textAlign: "left",
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid #fecaca",
  background: "#fef2f2",
  color: "#b91c1c",
  cursor: "pointer",
  marginTop: "12px",
  fontWeight: "600",
};

const logoutBtn = {
  width: "100%",
  background: "#dc2626",
  color: "white",
  padding: "14px",
  borderRadius: "12px",
  border: "none",
  fontWeight: "600",
  cursor: "pointer",
};

const muted = {
  color: "#64748b",
  fontSize: "14px",
};

const input = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid #e5e7eb",
  fontSize: "14px",
};

const saveBtn = {
  marginTop: "12px",
  background: "#2563eb",
  color: "white",
  padding: "12px 20px",
  borderRadius: "12px",
  border: "none",
  fontWeight: "600",
  cursor: "pointer",
};

const errorText = {
  color: "#dc2626",
  fontSize: "13px",
  marginTop: "4px",
};

const successText = {
  color: "#16a34a",
  fontSize: "14px",
  marginTop: "10px",
};
