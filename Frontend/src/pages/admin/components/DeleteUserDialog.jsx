import React, { useState } from "react";
import { deleteUserById } from "../../../services/adminServices";
import { Container, Typography, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

export const DeleteUserDialog = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      setLoading(true);
      const data = await deleteUserById(id);
      console.log("Delete User API Response:", data);
      navigate("/admin/students");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  if (!id) return null;

  return (
    <Container>
      <Typography variant="h5">
        Are you sure you want to delete this user?
      </Typography>

      <Button color="error" onClick={handleDelete} sx={{ mt: 2 }}>
        Yes, Delete
      </Button>

      <Button onClick={() => navigate(-1)} sx={{ ml: 2, mt: 2 }}>
        Cancel
      </Button>
    </Container>
  );
};
