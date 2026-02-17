import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { getProfile, updateProfile } from "../../services/userServices";
import useToast from "../../hooks/useToast";

export default function AdminSettings() {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfile();
        setFormData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          bio: data.bio || "",
        });
      } catch (err) {
        showToast(err?.response?.data?.message || "Failed to load profile", "error");
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [showToast]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await updateProfile(formData);
      showToast("Profile updated successfully.", "success");
      setIsEditing(false);
    } catch (err) {
      showToast(err?.response?.data?.message || "Failed to update profile", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Stack direction="row" spacing={1.2} alignItems="center">
        <CircularProgress size={20} />
        <Typography color="text.secondary">Loading settings...</Typography>
      </Stack>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 0.6 }}>Settings</Typography>
      <Typography color="text.secondary" sx={{ mb: 2.2 }}>
        Manage your admin profile and platform preferences.
      </Typography>

      <Stack spacing={2.2} sx={{ maxWidth: 740 }}>
        <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0" }}>
          <CardContent sx={{ p: { xs: 2.2, md: 3 } }}>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2.2} alignItems={{ xs: "flex-start", md: "center" }} sx={{ mb: 3 }}>
              <Avatar sx={{ width: 64, height: 64, bgcolor: "#2563eb", fontSize: "1.6rem", fontWeight: 800 }}>
                {(formData.name || "A").charAt(0).toUpperCase()}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 900 }}>{formData.name || "Admin"}</Typography>
                <Typography color="text.secondary">Administrator</Typography>
              </Box>
              <Button
                variant={isEditing ? "contained" : "outlined"}
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
                disabled={saving}
                sx={{ borderRadius: 2.5 }}
              >
                {saving ? "Saving..." : isEditing ? "Save Changes" : "Edit Profile"}
              </Button>
            </Stack>

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Email"
                  name="email"
                  value={formData.email}
                  disabled
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  label="Bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  disabled={!isEditing}
                  fullWidth
                  multiline
                  rows={3}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0" }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>Platform Settings</Typography>
            <Typography color="text.secondary">
              Platform-level configurations will appear here in future.
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
