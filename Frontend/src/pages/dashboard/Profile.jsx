import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { getProfile, updateProfile } from "../../services/userServices";
import useToast from "../../hooks/useToast";

export default function Profile() {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    date_of_birth: "",
  });

  const [loading, setLoading] = useState(false);
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
          date_of_birth: (data.date_of_birth || "").slice(0, 10),
        });
      } catch (requestError) {
        showToast(
          requestError?.response?.data?.message || requestError.message || "Failed to load profile",
          "error"
        );
      }
    };
    loadProfile();
  }, [showToast]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await updateProfile(formData);
      showToast("Profile updated successfully.", "success");
      setIsEditing(false);
    } catch (requestError) {
      showToast(
        requestError?.response?.data?.message || requestError.message || "Failed to update profile",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 0.6 }}>My Profile</Typography>
      <Typography color="text.secondary" sx={{ mb: 3.2 }}>
        Manage your personal information.
      </Typography>

      <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0" }}>
        <CardContent sx={{ p: { xs: 2.2, md: 3.2 } }}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2.2} alignItems={{ xs: "flex-start", md: "center" }} sx={{ mb: 3 }}>
            <Avatar sx={{ width: 72, height: 72, bgcolor: "#2563eb", fontSize: "1.9rem", fontWeight: 800 }}>
              {(formData.name || "U").charAt(0).toUpperCase()}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 900 }}>{formData.name || "Student"}</Typography>
              <Typography color="text.secondary">Student</Typography>
            </Box>
            <Button
              variant={isEditing ? "contained" : "outlined"}
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
              disabled={loading}
              sx={{ borderRadius: 2.5 }}
            >
              {loading ? "Saving..." : isEditing ? "Save Changes" : "Edit Profile"}
            </Button>
          </Stack>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Full Name"
                value={formData.name}
                onChange={handleChange}
                name="name"
                disabled={!isEditing}
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Email Address"
                name="email"
                value={formData.email}
                disabled
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                type="date"
                label="Date of Birth"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                disabled={!isEditing}
                fullWidth
                InputLabelProps={{ shrink: true }}
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
                rows={4}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
