import { Box, Card, CardContent, Stack, TextField, Typography } from "@mui/material";

export default function AdminSettings() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 0.6 }}>Settings</Typography>
      <Typography color="text.secondary" sx={{ mb: 2.2 }}>
        Manage your admin profile and platform preferences.
      </Typography>

      <Stack spacing={2.2} sx={{ maxWidth: 640 }}>
        <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0" }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.6 }}>Admin Profile</Typography>
            <Stack spacing={1.6}>
              <TextField label="Name" value="Admin User" disabled fullWidth />
              <TextField label="Email" value="admin@thaksa.com" disabled fullWidth />
            </Stack>
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
