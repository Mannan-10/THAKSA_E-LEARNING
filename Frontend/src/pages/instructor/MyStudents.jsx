import React from "react";

export default function MyStudents() {
  const students = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      batch: "Cloud & DevOps - Batch A",
      attendance: "95%",
      performance: "Excellent",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      batch: "Full Stack - Batch C",
      attendance: "88%",
      performance: "Good",
    },
    {
      id: 3,
      name: "Robert Brown",
      email: "robert.b@example.com",
      batch: "Cloud & DevOps - Batch A",
      attendance: "72%",
      performance: "Average",
    },
    {
      id: 4,
      name: "Alice Wilson",
      email: "alice.w@example.com",
      batch: "Data Science - Batch B",
      attendance: "100%",
      performance: "Excellent",
    },
  ];

  return (
    <div>
      <header style={header}>
        <h1 style={title}>Students List</h1>
        <p style={subtitle}>View and manage students across all your assigned batches.</p>
      </header>

      <div style={tableContainer}>
        <table style={table}>
          <thead>
            <tr style={tableHeaderRow}>
              <th style={th}>Student Name</th>
              <th style={th}>Batch</th>
              <th style={th}>Attendance</th>
              <th style={th}>Performance</th>
              <th style={th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} style={tableRow}>
                <td style={td}>
                  <div style={nameContainer}>
                    <span style={studentName}>{student.name}</span>
                    <span style={studentEmail}>{student.email}</span>
                  </div>
                </td>
                <td style={td}>{student.batch}</td>
                <td style={td}>{student.attendance}</td>
                <td style={td}>
                  <span style={getPerformanceStyle(student.performance)}>
                    {student.performance}
                  </span>
                </td>
                <td style={td}>
                  <button style={actionBtn}>View Profile</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const getPerformanceStyle = (performance) => ({
  fontSize: "12px",
  fontWeight: "700",
  padding: "4px 12px",
  borderRadius: "99px",
  background: 
    performance === "Excellent" ? "#dcfce7" : 
    performance === "Good" ? "#dbeafe" : "#fef3c7",
  color: 
    performance === "Excellent" ? "#166534" : 
    performance === "Good" ? "#1e40af" : "#92400e",
});

const header = {
  marginBottom: "32px",
};

const title = {
  fontSize: "28px",
  fontWeight: "800",
  color: "#0f172a",
  margin: 0,
};

const subtitle = {
  color: "#64748b",
  marginTop: "8px",
};

const tableContainer = {
  background: "white",
  borderRadius: "16px",
  border: "1px solid #e5e7eb",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  textAlign: "left",
};

const tableHeaderRow = {
  background: "#f8fafc",
  borderBottom: "1px solid #e5e7eb",
};

const th = {
  padding: "16px 24px",
  fontSize: "14px",
  fontWeight: "600",
  color: "#64748b",
};

const td = {
  padding: "16px 24px",
  fontSize: "14px",
  color: "#334155",
  borderBottom: "1px solid #f1f5f9",
};

const tableRow = {
  transition: "background 0.2s",
};

const nameContainer = {
  display: "flex",
  flexDirection: "column",
};

const studentName = {
  fontWeight: "600",
  color: "#0f172a",
};

const studentEmail = {
  fontSize: "12px",
  color: "#64748b",
};

const actionBtn = {
  padding: "6px 12px",
  borderRadius: "6px",
  border: "1px solid #e2e8f0",
  background: "white",
  fontSize: "13px",
  fontWeight: "600",
  color: "#2563eb",
  cursor: "pointer",
  transition: "all 0.2s",
};
