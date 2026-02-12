import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../../../services/adminServices';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    },[]);

    const fetchUsers = async () => {
        try {
            const data = await getAllUsers();
            console.log("Fetch User API Response:",data);
            setUsers(data.users || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
  return (
    <TableContainer component={Paper} elevation={3} sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Users List
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Email</strong></TableCell>
            <TableCell><strong>Role</strong></TableCell>
            <TableCell><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} hover>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => navigate(`/admin/students/${user.id}`)}
                  >
                    View
                  </Button>

                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => navigate(`/admin/students/${user.id}/role`)}
                  >
                    Edit Role
                  </Button>

                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => navigate(`/admin/students/${user.id}/delete`)}
                  >
                    Delete
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
