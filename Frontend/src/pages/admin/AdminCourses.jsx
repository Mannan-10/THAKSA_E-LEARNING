import { useEffect, useState } from "react";
import { approveCourse, getPendingCourses, rejectCourse } from "../../services/adminServices";

import { Tabs, Tab, Box } from "@mui/material";
import AdminApprovedCourses from "./AdminApprovedCourses";
import { AdminRejectedCourses } from "./AdminRejectedCourses";
import { AdminPendingCourses } from "./AdminPendingCourses";

export default function AdminCourses() {
  const [tab, setTab] = useState(0);

  return (
        <Box sx={{ p: 3 }}>
      <Tabs value={tab} onChange={(e, newVal) => setTab(newVal)}>
        <Tab label="Pending" />
        <Tab label="Approved" />
        <Tab label="Rejected" />
      </Tabs>

      <Box sx={{ mt: 3 }}>
        {tab === 0 && <AdminPendingCourses />}
        {tab === 1 && <AdminApprovedCourses />}
        {tab === 2 && <AdminRejectedCourses />}
      </Box>
    </Box>
  );
}



const container = {
  display: "flex",
  flexDirection: "column",
  gap: "24px",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const title = {
  fontSize: "26px",
  fontWeight: "800",
};

const approveBtn = {
  background: "#dcfce7",
  color: "#166534",
  border: "none",
  padding: "6px 12px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
  marginRight: "8px",
};

const rejectBtn = {
  background: "#fee2e2",
  color: "#991b1b",
  border: "none",
  padding: "6px 12px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
};

const pendingBadge = {
  padding: "4px 10px",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: "600",
  background: "#fef3c7",
  color: "#92400e",
};

const tableWrapper = {
  background: "white",
  borderRadius: "14px",
  border: "1px solid #e5e7eb",
  overflow: "hidden",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
};

const th = {
  textAlign: "left",
  padding: "14px",
  background: "#f8fafc",
  fontSize: "14px",
  color: "#475569",
};

const td = {
  padding: "14px",
  borderTop: "1px solid #e5e7eb",
  fontSize: "14px",
};

const statusBadge = {
  padding: "4px 10px",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: "600",
};

const actionBtn = {
  background: "#f1f5f9",
  border: "none",
  padding: "6px 12px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
};
