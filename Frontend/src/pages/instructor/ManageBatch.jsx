import React from "react";

export default function ManageBatch() {
  const batches = [
    {
      id: 1,
      name: "Cloud & DevOps - Batch A",
      students: 42,
      progress: 65,
      nextSession: "Tomorrow, 10:00 AM",
      status: "Active",
    },
    {
      id: 2,
      name: "Full Stack - Batch C",
      students: 38,
      progress: 20,
      nextSession: "Today, 02:30 PM",
      status: "Active",
    },
    {
      id: 3,
      name: "Data Science - Batch B",
      students: 44,
      progress: 100,
      nextSession: "Completed",
      status: "Completed",
    },
  ];

  return (
    <div>
      <header style={header}>
        <h1 style={title}>Manage Batches</h1>
        <p style={subtitle}>Monitor and manage your assigned student groups.</p>
      </header>

      <div style={batchGrid}>
        {batches.map((batch) => (
          <div key={batch.id} style={batchCard}>
            <div style={cardHeader}>
              <h3 style={batchName}>{batch.name}</h3>
              <span style={getStatusStyle(batch.status)}>{batch.status}</span>
            </div>

            <div style={infoRow}>
              <span style={infoLabel}>Total Students:</span>
              <span style={infoValue}>{batch.students}</span>
            </div>

            <div style={infoRow}>
              <span style={infoLabel}>Next Session:</span>
              <span style={infoValue}>{batch.nextSession}</span>
            </div>

            <div style={progressContainer}>
              <div style={progressLabelRow}>
                <span style={infoLabel}>Course Progress</span>
                <span style={infoValue}>{batch.progress}%</span>
              </div>
              <div style={progressBarBg}>
                <div 
                  style={{ 
                    ...progressBarFill, 
                    width: `${batch.progress}%`,
                    background: batch.status === "Completed" ? "#16a34a" : "#2563eb" 
                  }} 
                />
              </div>
            </div>

            <div style={cardActions}>
              <button style={primaryBtn}>View Details</button>
              <button style={secondaryBtn}>Attendance</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const getStatusStyle = (status) => ({
  fontSize: "12px",
  fontWeight: "700",
  padding: "4px 12px",
  borderRadius: "99px",
  background: status === "Active" ? "#dcfce7" : "#f1f5f9",
  color: status === "Active" ? "#166534" : "#475569",
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

const batchGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
  gap: "24px",
};

const batchCard = {
  background: "white",
  padding: "24px",
  borderRadius: "16px",
  border: "1px solid #e5e7eb",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
};

const cardHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: "20px",
};

const batchName = {
  fontSize: "18px",
  fontWeight: "700",
  color: "#0f172a",
  margin: 0,
  maxWidth: "200px",
};

const infoRow = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "12px",
};

const infoLabel = {
  fontSize: "14px",
  color: "#64748b",
  fontWeight: "500",
};

const infoValue = {
  fontSize: "14px",
  color: "#0f172a",
  fontWeight: "600",
};

const progressContainer = {
  marginTop: "20px",
  marginBottom: "24px",
};

const progressLabelRow = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "8px",
};

const progressBarBg = {
  width: "100%",
  height: "8px",
  background: "#f1f5f9",
  borderRadius: "4px",
  overflow: "hidden",
};

const progressBarFill = {
  height: "100%",
  transition: "width 0.3s ease",
};

const cardActions = {
  display: "flex",
  gap: "12px",
};

const primaryBtn = {
  flex: 1,
  padding: "10px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontWeight: "600",
  cursor: "pointer",
  fontSize: "14px",
};

const secondaryBtn = {
  flex: 1,
  padding: "10px",
  background: "white",
  color: "#2563eb",
  border: "1px solid #bfdbfe",
  borderRadius: "8px",
  fontWeight: "600",
  cursor: "pointer",
  fontSize: "14px",
};
