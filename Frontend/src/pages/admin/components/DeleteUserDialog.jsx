import { useState } from "react";
import { Alert, Box, Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { deleteUserById } from "../../../services/adminServices";
import { useNavigate, useParams } from "react-router-dom";

export const DeleteUserDialog = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      setLoading(true);
      setError("");
      await deleteUserById(id);
      navigate("/admin/students");
    } catch (requestError) {
      setError(requestError?.response?.data?.message || "Failed to delete user");
    } finally {
      setLoading(false);
    }
  };

  if (!id) return null;

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>Delete User</Typography>
      <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #fecaca", maxWidth: 680 }}>
        <CardContent>
          <Typography variant="h6" sx={{ color: "#991b1b", mb: 1.2 }}>
            Are you sure you want to delete this user?
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            This action cannot be undone.
          </Typography>

          {error ? <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert> : null}

          <Stack direction="row" spacing={1.2}>
            <Button color="error" variant="contained" onClick={handleDelete} disabled={loading}>
              {loading ? "Deleting..." : "Yes, Delete"}
            </Button>
            <Button onClick={() => navigate(-1)}>Cancel</Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};
