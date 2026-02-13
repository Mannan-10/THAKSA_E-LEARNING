import { Box, Button, Card, CardContent, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

const students = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", batch: "Cloud and DevOps - Batch A", attendance: "95%", performance: "Excellent" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", batch: "Full Stack - Batch C", attendance: "88%", performance: "Good" },
  { id: 3, name: "Robert Brown", email: "robert.b@example.com", batch: "Cloud and DevOps - Batch A", attendance: "72%", performance: "Average" },
  { id: 4, name: "Alice Wilson", email: "alice.w@example.com", batch: "Data Science - Batch B", attendance: "100%", performance: "Excellent" },
];

const perfColor = {
  Excellent: { bg: "#dcfce7", text: "#166534" },
  Good: { bg: "#dbeafe", text: "#1e40af" },
  Average: { bg: "#fef3c7", text: "#92400e" },
};

export default function MyStudents() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 0.6 }}>Students List</Typography>
      <Typography color="text.secondary" sx={{ mb: 2.2 }}>
        View and manage students across your assigned batches.
      </Typography>

      <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0" }}>
        <CardContent sx={{ p: 0 }}>
          <TableContainer sx={{ overflowX: "auto" }}>
            <Table sx={{ minWidth: 760 }}>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Student</strong></TableCell>
                  <TableCell><strong>Batch</strong></TableCell>
                  <TableCell><strong>Attendance</strong></TableCell>
                  <TableCell><strong>Performance</strong></TableCell>
                  <TableCell align="right"><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id} hover>
                    <TableCell>
                      <Typography sx={{ fontWeight: 700 }}>{student.name}</Typography>
                      <Typography variant="body2" color="text.secondary">{student.email}</Typography>
                    </TableCell>
                    <TableCell>{student.batch}</TableCell>
                    <TableCell>{student.attendance}</TableCell>
                    <TableCell>
                      <Chip
                        label={student.performance}
                        size="small"
                        sx={{
                          fontWeight: 700,
                          bgcolor: perfColor[student.performance].bg,
                          color: perfColor[student.performance].text,
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Button size="small" variant="outlined">View Profile</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}
