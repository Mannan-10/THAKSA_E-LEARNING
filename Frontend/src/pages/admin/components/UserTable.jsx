import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { getAllUsers } from "../../../services/adminServices";
import { useNavigate } from "react-router-dom";

const filterTabs = ["all", "student", "instructor", "admin"];
const filterLabels = { all: "All", student: "Students", instructor: "Instructors", admin: "Admins" };

const roleColors = {
  admin: { bg: "#fef2f2", color: "#991b1b" },
  instructor: { bg: "#eff6ff", color: "#1e40af" },
  student: { bg: "#f0fdf4", color: "#166534" },
};

export const UserTable = ({ onView, onEditRole, onDelete }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
      <CardContent sx={{ p: { xs: 1.5, sm: 2.2 } }}>
        <Typography variant="h6" sx={{ mb: 1.2, fontWeight: 800 }}>Users List</Typography>
        {error ? <Alert severity="error" sx={{ mb: 1.5 }}>{error}</Alert> : null}

        <Tabs
          value={filterTabs.indexOf(roleFilter)}
          onChange={(e, newVal) => setRoleFilter(filterTabs[newVal])}
          variant={isMobile ? "scrollable" : "standard"}
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{ mb: 2, borderBottom: "1px solid #e2e8f0" }}
        >
          {filterTabs.map((tab) => (
            <Tab key={tab} label={filterLabels[tab]} sx={{ textTransform: "none", fontWeight: 600 }} />
          ))}
        </Tabs>

        {/* Mobile card view */}
        {isMobile ? (
          <Stack spacing={1.5}>
            {filteredUsers.length === 0 ? (
              <Typography color="text.secondary" sx={{ py: 3, textAlign: "center" }}>
                No users found.
              </Typography>
            ) : (
              filteredUsers.map((user) => {
                const rc = roleColors[user.role] || { bg: "#f1f5f9", color: "#475569" };
                return (
                  <Box
                    key={user.id}
                    sx={{
                      border: "1px solid #e2e8f0",
                      borderRadius: 2.5,
                      p: 2,
                      bgcolor: "#fff",
                    }}
                  >
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          bgcolor: "#f1f5f9",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#64748b",
                          flexShrink: 0,
                        }}
                      >
                        <PersonRoundedIcon fontSize="small" />
                      </Box>
                      <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                        <Typography sx={{ fontWeight: 700, color: "#0f172a", fontSize: "0.95rem" }} noWrap>
                          {user.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" noWrap>
                          {user.email}
                        </Typography>
                      </Box>
                      <Chip
                        label={user.role}
                        size="small"
                        sx={{
                          fontWeight: 700,
                          textTransform: "capitalize",
                          bgcolor: rc.bg,
                          color: rc.color,
                          flexShrink: 0,
                        }}
                      />
                    </Stack>

                    <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 0.5 }} useFlexGap>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{ textTransform: "none", borderRadius: 2, flex: 1, minWidth: 70 }}
                        onClick={() => (onView ? onView(user.id) : navigate(`/admin/students/${user.id}`))}
                      >
                        View
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ textTransform: "none", borderRadius: 2, flex: 1, minWidth: 70 }}
                        onClick={() => (onEditRole ? onEditRole(user) : navigate(`/admin/students/${user.id}/role`))}
                      >
                        Edit Role
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        sx={{ textTransform: "none", borderRadius: 2, flex: 1, minWidth: 70 }}
                        onClick={() => (onDelete ? onDelete(user.id) : navigate(`/admin/students/${user.id}/delete`))}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </Box>
                );
              })
            )}
          </Stack>
        ) : (
          /* Desktop table view */
          <TableContainer sx={{ overflowX: "auto" }}>
            <Table sx={{ minWidth: 700 }}>
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
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          <Button
                            variant="contained"
                            size="small"
                            sx={{ textTransform: "none" }}
                            onClick={() => (onView ? onView(user.id) : navigate(`/admin/students/${user.id}`))}
                          >
                            View
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            sx={{ textTransform: "none" }}
                            onClick={() => (onEditRole ? onEditRole(user) : navigate(`/admin/students/${user.id}/role`))}
                          >
                            Edit Role
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            sx={{ textTransform: "none" }}
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
        )}
      </CardContent>
    </Card>
  );
};
