import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const upcomingAssessments = [
  { name: "AWS Solutions Architect Quiz", course: "AWS & DevOps Bootcamp", dueDate: "2025-06-20", status: "Pending" },
  { name: "Docker Practical Test", course: "AWS & DevOps Bootcamp", dueDate: "2025-06-25", status: "Pending" },
];

const pastAssessments = [
  { name: "Linux Fundamentals Quiz", course: "AWS & DevOps Bootcamp", dueDate: "2025-06-01", status: "Completed", score: "85%" },
  { name: "Git & GitHub Assessment", course: "AWS & DevOps Bootcamp", dueDate: "2025-05-25", status: "Completed", score: "92%" },
  { name: "Networking Basics Quiz", course: "AWS & DevOps Bootcamp", dueDate: "2025-05-18", status: "Completed", score: "78%" },
];

export default function Assessment() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 0.6 }}>Assessments</Typography>
      <Typography color="text.secondary" sx={{ mb: 3.2 }}>
        View your upcoming and past assessments.
      </Typography>

      <Alert severity="info" sx={{ mb: 2.5 }}>Assessments feature is coming soon. The data below is a preview.</Alert>

      <Card elevation={0} sx={cardSx}>
        <CardContent sx={{ p: { xs: 2.2, md: 3 } }}>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.4 }}>Upcoming Assessments</Typography>
          {upcomingAssessments.length === 0 ? (
            <Typography color="text.secondary">No upcoming assessments.</Typography>
          ) : (
            <TableContainer sx={{ overflowX: "auto" }}>
              <Table sx={{ minWidth: 600 }}>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Assessment</strong></TableCell>
                    <TableCell><strong>Course</strong></TableCell>
                    <TableCell><strong>Due Date</strong></TableCell>
                    <TableCell><strong>Status</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {upcomingAssessments.map((item, idx) => (
                    <TableRow key={idx} hover>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.course}</TableCell>
                      <TableCell>{new Date(item.dueDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Chip label={item.status} size="small" sx={{ fontWeight: 700, bgcolor: "#fef3c7", color: "#92400e" }} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      <Card elevation={0} sx={{ ...cardSx, mt: 2.2 }}>
        <CardContent sx={{ p: { xs: 2.2, md: 3 } }}>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.4 }}>Past Assessments</Typography>
          {pastAssessments.length === 0 ? (
            <Typography color="text.secondary">No past assessments.</Typography>
          ) : (
            <TableContainer sx={{ overflowX: "auto" }}>
              <Table sx={{ minWidth: 700 }}>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Assessment</strong></TableCell>
                    <TableCell><strong>Course</strong></TableCell>
                    <TableCell><strong>Due Date</strong></TableCell>
                    <TableCell><strong>Status</strong></TableCell>
                    <TableCell><strong>Score</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pastAssessments.map((item, idx) => (
                    <TableRow key={idx} hover>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.course}</TableCell>
                      <TableCell>{new Date(item.dueDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Chip label={item.status} size="small" sx={{ fontWeight: 700, bgcolor: "#dcfce7", color: "#166534" }} />
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ fontWeight: 700 }}>{item.score}</Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

const cardSx = {
  borderRadius: 3,
  border: "1px solid #e2e8f0",
  boxShadow: "0 14px 26px rgba(15,23,42,0.05)",
};
