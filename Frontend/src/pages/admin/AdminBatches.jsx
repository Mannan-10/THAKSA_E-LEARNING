import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export default function AdminBatches() {
  const [batches] = useState([
    { id: 1, name: "DevOps and Cloud - Jan 2025", duration: "4 Months", students: 32, status: "Active" },
    { id: 2, name: "Data Science - Feb 2025", duration: "5 Months", students: 24, status: "Upcoming" },
  ]);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2.2 }}>
        <Typography variant="h4">Batches</Typography>
        <Button variant="contained" sx={{ borderRadius: 2.5 }}>Create Batch</Button>
      </Box>

      <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0" }}>
        <CardContent sx={{ p: 0 }}>
          <TableContainer sx={{ overflowX: "auto" }}>
            <Table sx={{ minWidth: 720 }}>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Batch Name</strong></TableCell>
                  <TableCell><strong>Duration</strong></TableCell>
                  <TableCell><strong>Students</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {batches.map((batch) => (
                  <TableRow key={batch.id} hover>
                    <TableCell>{batch.name}</TableCell>
                    <TableCell>{batch.duration}</TableCell>
                    <TableCell>{batch.students}</TableCell>
                    <TableCell>
                      <Chip
                        label={batch.status}
                        size="small"
                        sx={{
                          fontWeight: 700,
                          bgcolor: batch.status === "Active" ? "#dcfce7" : "#e0f2fe",
                          color: batch.status === "Active" ? "#166534" : "#0369a1",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Button size="small" variant="outlined">View</Button>
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
