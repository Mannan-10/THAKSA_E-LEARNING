import React, { useEffect, useState } from "react";
import { getUserById, updateUserRole } from "../../../services/adminServices";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Typography, Button, Select, MenuItem } from "@mui/material";

export const RoleUpdateDialog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    const data = await getUserById(id);
    console.log("Fetch User by Id API Response:", data);
    setUser(data);
    setRole(data.role);
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const response = await updateUserRole(id, role);
      console.log("Update Role API Response:", response);
      navigate("/admin/students");
    } catch (error) {
      console.error("update error:",error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <Container>
      <Typography variant="h4">Update Role</Typography>
      <Typography>User: {user.name}</Typography>

      <Select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        sx={{ mt: 2 }}
      >
        <MenuItem value="student">Student</MenuItem>
        <MenuItem value="instructor">Instructor</MenuItem>
        <MenuItem value="admin">Admin</MenuItem>
      </Select>

      <div style={{ marginTop: 20 }}>
        <Button onClick={handleUpdate}>Save</Button>
        <Button onClick={() => navigate(-1)} sx={{ ml: 2 }}>
          Cancel
        </Button>
      </div>
    </Container>
  );
};
