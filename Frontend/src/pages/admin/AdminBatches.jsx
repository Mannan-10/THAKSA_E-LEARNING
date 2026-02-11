import { useState } from "react";

export default function AdminBatches() {
  const [batches, setBatches] = useState([
    {
      id: 1,
      name: "DevOps & Cloud – Jan 2025",
      duration: "4 Months",
      students: 32,
      status: "Active",
    },
    {
      id: 2,
      name: "Data Science – Feb 2025",
      duration: "5 Months",
      students: 24,
      status: "Upcoming",
    },
  ]);

  return (
    <div style={container}>
      
      <div style={header}>
        <h1 style={title}>Batches</h1>
        <button style={primaryBtn}>+ Create Batch</button>
      </div>

      <div style={tableWrapper}>
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>Batch Name</th>
              <th style={th}>Duration</th>
              <th style={th}>Students</th>
              <th style={th}>Status</th>
              <th style={th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {batches.map((batch) => (
              <tr key={batch.id}>
                <td style={td}>{batch.name}</td>
                <td style={td}>{batch.duration}</td>
                <td style={td}>{batch.students}</td>
                <td style={td}>
                  <span
                    style={{
                      ...statusBadge,
                      background:
                        batch.status === "Active"
                          ? "#dcfce7"
                          : "#e0f2fe",
                      color:
                        batch.status === "Active"
                          ? "#166534"
                          : "#0369a1",
                    }}
                  >
                    {batch.status}
                  </span>
                </td>
                <td style={td}>
                  <button style={actionBtn}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
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

const primaryBtn = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  padding: "10px 16px",
  borderRadius: "10px",
  fontWeight: "600",
  cursor: "pointer",
};

const tableWrapper = {
  background: "#ffffff",
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
