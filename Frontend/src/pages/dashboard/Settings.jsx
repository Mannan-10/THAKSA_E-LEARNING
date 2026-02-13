import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../services/userServices";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

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

  const [error, setError] = useState({});

  const togglePassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "", api: "" });
    setSuccess("");
  };

  const validate = () => {
    const newErrors = {};

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

      setSuccess("Password updated successfully.");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (requestError) {
      setError((prev) => ({
        ...prev,
        api: requestError?.response?.data?.message || "Failed to update password",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 0.6 }}>Settings</Typography>
      <Typography color="text.secondary" sx={{ mb: 3.2 }}>
        Manage your account preferences.
      </Typography>

      <Card elevation={0} sx={cardSx}>
        <CardContent sx={{ p: { xs: 2.2, md: 3 } }}>
          <Typography variant="h6" sx={{ mb: 1.2, fontWeight: 800 }}>Update Password</Typography>

          <Stack spacing={1.5}>
            <PasswordField
              label="Current Password"
              name="currentPassword"
              value={passwordData.currentPassword}
              show={showPassword.current}
              onToggle={() => togglePassword("current")}
              onChange={handlePasswordChange}
            />
            {error.currentPassword ? <Alert severity="error">{error.currentPassword}</Alert> : null}

            <PasswordField
              label="New Password"
              name="newPassword"
              value={passwordData.newPassword}
              show={showPassword.new}
              onToggle={() => togglePassword("new")}
              onChange={handlePasswordChange}
            />
            {error.newPassword ? <Alert severity="error">{error.newPassword}</Alert> : null}

            <PasswordField
              label="Confirm Password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              show={showPassword.confirm}
              onToggle={() => togglePassword("confirm")}
              onChange={handlePasswordChange}
            />
            {error.confirmPassword ? <Alert severity="error">{error.confirmPassword}</Alert> : null}

            {error.api ? <Alert severity="error">{error.api}</Alert> : null}
            {success ? <Alert severity="success">{success}</Alert> : null}

            <Button variant="contained" onClick={updatePassword} disabled={loading} sx={{ mt: 0.5, borderRadius: 2.5 }}>
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Card elevation={0} sx={cardSx}>
        <CardContent sx={{ p: { xs: 2.2, md: 3 } }}>
          <Typography variant="h6" sx={{ mb: 0.6, fontWeight: 800 }}>Session</Typography>
          <Typography color="text.secondary" sx={{ mb: 1.4 }}>Sign out from this device.</Typography>
          <Button color="error" variant="contained" onClick={handleLogout} sx={{ borderRadius: 2.5 }}>
            Logout
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

function PasswordField({ label, name, value, show, onToggle, onChange }) {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <OutlinedInput
        type={show ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={onToggle} edge="end">
              {show ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
    </FormControl>
  );
}

const cardSx = {
  borderRadius: 3,
  border: "1px solid #e2e8f0",
  boxShadow: "0 14px 26px rgba(15,23,42,0.05)",
  mb: 2.2,
};
