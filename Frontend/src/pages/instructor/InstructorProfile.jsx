import { useState } from "react";
import { Alert, Avatar, Box, Button, Card, CardContent, Chip, Grid, Stack, TextField, Typography } from "@mui/material";

export default function InstructorProfile() {
  const [profile, setProfile] = useState({
    name: "Dr. Robert Fox",
    email: "robert.fox@thaksa.edu",
    role: "Senior Instructor",
    bio: "Expert in Cloud Computing and DevOps with over 10 years of industry experience. Passionate about teaching modern software architecture.",
    expertise: "Cloud Computing, DevOps, Kubernetes, AWS",
    joinedDate: "January 2023",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState("");

  const handleSave = () => {
    setIsEditing(false);
    setStatus("Profile updated successfully.");
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 0.6 }}>My Profile</Typography>
      <Typography color="text.secondary" sx={{ mb: 3.2 }}>
        Manage your professional information and public bio.
      </Typography>

      <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0" }}>
        <CardContent sx={{ p: { xs: 2.2, md: 3.2 } }}>
          {status ? <Alert severity="success" sx={{ mb: 2 }}>{status}</Alert> : null}

          <Stack direction={{ xs: "column", md: "row" }} spacing={2.2} alignItems={{ xs: "flex-start", md: "center" }} sx={{ mb: 3 }}>
            <Avatar sx={{ width: 72, height: 72, bgcolor: "#2563eb", fontSize: "1.9rem", fontWeight: 800 }}>
              {(profile.name || "I").charAt(0).toUpperCase()}
            </Avatar>

            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 900 }}>{profile.name}</Typography>
              <Chip label={profile.role} size="small" sx={{ mt: 0.6, fontWeight: 700 }} />
            </Box>

            <Button variant={isEditing ? "contained" : "outlined"} onClick={isEditing ? handleSave : () => setIsEditing(true)}>
              {isEditing ? "Save Changes" : "Edit Profile"}
            </Button>
          </Stack>

          <Grid container spacing={2} sx={{ maxWidth: 760 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Full Name"
                value={profile.name}
                disabled={!isEditing}
                fullWidth
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Email Address"
                value={profile.email}
                disabled={!isEditing}
                fullWidth
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Professional Bio"
                value={profile.bio}
                disabled={!isEditing}
                fullWidth
                multiline
                rows={4}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Expertise (comma separated)"
                value={profile.expertise}
                disabled={!isEditing}
                fullWidth
                onChange={(e) => setProfile({ ...profile, expertise: e.target.value })}
              />
            </Grid>
          </Grid>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
            Member since {profile.joinedDate}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
