import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import { getAllUsers } from "../../../services/adminServices";
import { useNavigate } from "react-router-dom";

const filterTabs = ["all", "student", "instructor", "admin"];
const filterLabels = { all: "All", student: "Students", instructor: "Instructors", admin: "Admins" };

export const UserTable = ({ onView, onEditRole, onDelete }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getAllUsers();
      setUsers(data?.users || []);
    } catch (requestError) {
      setError(requestError?.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = useMemo(
    () => (roleFilter === "all" ? users : users.filter((u) => u.role === roleFilter)),
    [users, roleFilter]
  );

  if (loading) {
    return (
      <Stack direction="row" spacing={1.2} alignItems="center">
        <CircularProgress size={20} />
        <Typography color="text.secondary">Loading users...</Typography>
      </Stack>
    );
  }

  return (
    <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0" }}>
      <CardContent sx={{ p: 2.2 }}>
        <Typography variant="h6" sx={{ mb: 1.2, fontWeight: 800 }}>Users List</Typography>
        {error ? <Alert severity="error" sx={{ mb: 1.5 }}>{error}</Alert> : null}

        <Tabs
          value={filterTabs.indexOf(roleFilter)}
          onChange={(e, newVal) => setRoleFilter(filterTabs[newVal])}
          sx={{ mb: 2, borderBottom: "1px solid #e2e8f0" }}
        >
          {filterTabs.map((tab) => (
            <Tab key={tab} label={filterLabels[tab]} />
          ))}
        </Tabs>

        <TableContainer sx={{ overflowX: "auto" }}>
          <Table sx={{ minWidth: 760 }}>
            <TableHead>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Role</strong></TableCell>
                <TableCell align="right"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4}>
                    <Typography color="text.secondary" sx={{ py: 2, textAlign: "center" }}>No users found.</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Chip label={user.role} size="small" sx={{ fontWeight: 700, textTransform: "capitalize" }} />
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction={{ xs: "column", sm: "row" }} spacing={1} justifyContent="flex-end">
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => (onView ? onView(user.id) : navigate(`/admin/students/${user.id}`))}
                        >
                          View
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => (onEditRole ? onEditRole(user) : navigate(`/admin/students/${user.id}/role`))}
                        >
                          Edit Role
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => (onDelete ? onDelete(user.id) : navigate(`/admin/students/${user.id}/delete`))}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};
