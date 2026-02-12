import React, { useEffect, useState } from 'react'
import { getUserById } from '../../../services/adminServices';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';

export const UserDetailsModal = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUser();
    },[id]);

    const fetchUser = async () => {
        try {
            setLoading(true);
            const data = await getUserById(id);
            console.log("Fetch User by Id API Response:",data);
            setUser(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    if (!open || !user) return null;

  return (
    <Container>
      <Typography variant="h4">User Details</Typography>
      <Typography>Name: {user.name}</Typography>
      <Typography>Email: {user.email}</Typography>
      <Typography>Role: {user.role}</Typography>

      <Button sx={{ mt: 2 }} onClick={() => navigate(-1)}>
        Back
      </Button>
    </Container>
  )
}
