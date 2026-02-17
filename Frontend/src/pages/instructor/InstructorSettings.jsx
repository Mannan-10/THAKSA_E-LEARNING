import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../services/userServices";
import useToast from "../../hooks/useToast";

export default function InstructorSettings() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

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

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    studentSubmissions: true,
    batchUpdates: false,
  });

  const togglePassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const validate = () => {
    if (!passwordData.currentPassword) return "Current password is required";
    if (!passwordData.newPassword) return "New password is required";
    if (passwordData.newPassword.length < 6) return "New password must be at least 6 characters";
    if (!passwordData.confirmPassword) return "Please confirm your new password";
    if (passwordData.confirmPassword !== passwordData.newPassword) return "Passwords do not match";
    return "";
  };

  const updatePassword = async () => {
    const validationError = validate();
    if (validationError) {
      showToast(validationError, "error");
      return;
    }

    try {
      setLoading(true);
      await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      showToast("Password updated successfully.", "success");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (requestError) {
      showToast(requestError?.response?.data?.message || "Failed to update password", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 0.6 }}>Settings</Typography>
      <Typography color="text.secondary" sx={{ mb: 2.2 }}>
        Manage your account preferences.
      </Typography>

      <Stack spacing={2.2} sx={{ maxWidth: 820 }}>
        <Card elevation={0} sx={cardSx}>
          <CardContent>
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
              <PasswordField
                label="New Password"
                name="newPassword"
                value={passwordData.newPassword}
                show={showPassword.new}
                onToggle={() => togglePassword("new")}
                onChange={handlePasswordChange}
              />
              <PasswordField
                label="Confirm Password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                show={showPassword.confirm}
                onToggle={() => togglePassword("confirm")}
                onChange={handlePasswordChange}
              />
              <Button variant="contained" onClick={updatePassword} disabled={loading} sx={{ mt: 0.5, borderRadius: 2.5, alignSelf: "flex-start" }}>
                {loading ? "Updating..." : "Update Password"}
              </Button>
            </Stack>
          </CardContent>
        </Card>

        <Card elevation={0} sx={cardSx}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.2 }}>Notifications</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Notification preferences coming soon.</Typography>
            <FormControlLabel
              control={<Switch checked={notifications.emailAlerts} onChange={() => toggleNotification("emailAlerts")} disabled />}
              label="Email Notifications"
            />
            <FormControlLabel
              control={<Switch checked={notifications.studentSubmissions} onChange={() => toggleNotification("studentSubmissions")} disabled />}
              label="Student Submissions"
            />
            <FormControlLabel
              control={<Switch checked={notifications.batchUpdates} onChange={() => toggleNotification("batchUpdates")} disabled />}
              label="Batch Updates"
            />
          </CardContent>
        </Card>

        <Card elevation={0} sx={cardSx}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.8 }}>Account Actions</Typography>
            <Typography color="text.secondary" sx={{ mb: 1.4 }}>Sign out from this device.</Typography>
            <Button color="error" variant="contained" onClick={handleLogout} sx={{ borderRadius: 2.5 }}>Logout</Button>
          </CardContent>
        </Card>
      </Stack>
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
};
