import { useState } from "react";
import { Box, Button, Card, CardContent, FormControlLabel, Stack, Switch, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function InstructorSettings() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    studentSubmissions: true,
    batchUpdates: false,
  });
  const [security, setSecurity] = useState({ twoFactor: false });

  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
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
        Manage your account preferences and security settings.
      </Typography>

      <Stack spacing={2.2} sx={{ maxWidth: 820 }}>
        <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0" }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.2 }}>Notifications</Typography>
            <FormControlLabel
              control={<Switch checked={notifications.emailAlerts} onChange={() => toggleNotification("emailAlerts")} />}
              label="Email Notifications"
            />
            <FormControlLabel
              control={<Switch checked={notifications.studentSubmissions} onChange={() => toggleNotification("studentSubmissions")} />}
              label="Student Submissions"
            />
            <FormControlLabel
              control={<Switch checked={notifications.batchUpdates} onChange={() => toggleNotification("batchUpdates")} />}
              label="Batch Updates"
            />
          </CardContent>
        </Card>

        <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0" }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.2 }}>Security</Typography>
            <FormControlLabel
              control={<Switch checked={security.twoFactor} onChange={() => setSecurity((prev) => ({ ...prev, twoFactor: !prev.twoFactor }))} />}
              label="Two-Factor Authentication"
            />
          </CardContent>
        </Card>

        <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0" }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.8 }}>Account Actions</Typography>
            <Typography color="text.secondary" sx={{ mb: 1.4 }}>Sign out from this device.</Typography>
            <Button color="error" variant="contained" onClick={handleLogout}>Logout</Button>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
