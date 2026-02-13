import { Box, Typography } from "@mui/material";
import { UserTable } from "./components/UserTable";
import { useNavigate } from "react-router-dom";

export default function AdminStudents() {
  const navigate = useNavigate();

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 0.6 }}>Admin Users</Typography>
      <Typography color="text.secondary" sx={{ mb: 2.2 }}>
        View user accounts and manage their access roles.
      </Typography>

      <UserTable
        onView={(id) => navigate(`/admin/students/${id}`)}
        onEditRole={(user) => navigate(`/admin/students/${user.id}/role`)}
        onDelete={(id) => navigate(`/admin/students/${id}/delete`)}
      />
    </Box>
  );
}
