import { useEffect, useState } from "react";
import { Alert, Box, Button, Card, CardContent, CircularProgress, MenuItem, Select, Stack, Typography } from "@mui/material";
import { getUserById, updateUserRole } from "../../../services/adminServices";
import { useNavigate, useParams } from "react-router-dom";
import useToast from "../../../hooks/useToast";

export const RoleUpdateDialog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [role, setRole] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setFetching(true);
        setError("");
        const data = await getUserById(id);
        const userData = data?.user || data;
        setUser(userData);
        setRole(userData?.role || "student");
      } catch (requestError) {
        setError(requestError?.response?.data?.message || "Failed to load user");
      } finally {
        setFetching(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await updateUserRole(id, role);
      showToast("User role updated successfully.", "success");
      navigate("/admin/students");
    } catch (requestError) {
      const errorMessage = requestError?.response?.data?.message || "Failed to update role";
      setError(errorMessage);
      showToast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>Update Role</Typography>
      {error ? <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert> : null}

      {fetching ? (
        <Stack direction="row" alignItems="center" spacing={1.2}>
          <CircularProgress size={20} />
          <Typography color="text.secondary">Loading user...</Typography>
        </Stack>
      ) : !user ? (
        <Alert severity="warning">User not found.</Alert>
      ) : (
        <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0", maxWidth: 680 }}>
          <CardContent>
            <Typography sx={{ mb: 1.5 }}><strong>User:</strong> {user.name}</Typography>

            <Select value={role} onChange={(e) => setRole(e.target.value)} fullWidth>
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="instructor">Instructor</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>

            <Stack direction="row" spacing={1.2} sx={{ mt: 2 }}>
              <Button variant="contained" onClick={handleUpdate} disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </Button>
              <Button onClick={() => navigate(-1)}>Cancel</Button>
            </Stack>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};
