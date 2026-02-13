import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import AdminApprovedCourses from "./AdminApprovedCourses";
import { AdminRejectedCourses } from "./AdminRejectedCourses";
import { AdminPendingCourses } from "./AdminPendingCourses";

export default function AdminCourses() {
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 0.6 }}>Course Moderation</Typography>
      <Typography color="text.secondary" sx={{ mb: 2.2 }}>
        Review and manage pending, approved, and rejected courses.
      </Typography>

      <Tabs
        value={tab}
        onChange={(e, newVal) => setTab(newVal)}
        sx={{ mb: 2.2, borderBottom: "1px solid #e2e8f0" }}
      >
        <Tab label="Pending" />
        <Tab label="Approved" />
        <Tab label="Rejected" />
      </Tabs>

      {tab === 0 && <AdminPendingCourses />}
      {tab === 1 && <AdminApprovedCourses />}
      {tab === 2 && <AdminRejectedCourses />}
    </Box>
  );
}
