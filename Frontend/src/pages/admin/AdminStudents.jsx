import { UserTable } from "./components/UserTable";
import { Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AdminStudents() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Users
      </Typography>

      <UserTable
        onView={(id) => navigate(`/admin/students/${id}`)}
        onEditRole={(user) =>
          navigate(`/admin/students/${user.id}/role`)
        }
        onDelete={(id) =>
          navigate(`/admin/students/${id}/delete`)
        }
      />
    </Container>
  );
}
