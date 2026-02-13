import { useEffect, useState } from "react";
import { Alert, Box, Button, Card, CardContent, CircularProgress, Stack, Typography } from "@mui/material";
import { getUserById } from "../../../services/adminServices";
import { useNavigate, useParams } from "react-router-dom";

export const UserDetailsModal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getUserById(id);
        setUser(data?.user || data);
      } catch (requestError) {
        setError(requestError?.response?.data?.message || "Failed to load user");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>User Details</Typography>

      {loading ? (
        <Stack direction="row" alignItems="center" spacing={1.2}>
          <CircularProgress size={20} />
          <Typography color="text.secondary">Loading user...</Typography>
        </Stack>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : !user ? (
        <Alert severity="warning">User not found.</Alert>
      ) : (
        <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0", maxWidth: 680 }}>
          <CardContent>
            <Typography><strong>Name:</strong> {user.name}</Typography>
            <Typography><strong>Email:</strong> {user.email}</Typography>
            <Typography><strong>Role:</strong> {user.role}</Typography>
            <Button sx={{ mt: 2 }} onClick={() => navigate(-1)}>
              Back
            </Button>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};
