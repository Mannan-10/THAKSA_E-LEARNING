export default function AdminStudents() {
  const students = [
    {
      id: 1,
      name: "Ayaan Khan",
      email: "ayaan@gmail.com",
      batch: "DevOps – Jan 2025",
      status: "Active",
    },
    {
      id: 2,
      name: "Ahmed",
      email: "ahmed@gmail.com",
      batch: "Data Science – Feb 2025",
      status: "Active",
    },
    {
      id: 3,
      name: "Rahul Verma",
      email: "rahul@gmail.com",
      batch: "Not Assigned",
      status: "Inactive",
    },
  ];

  return (
    <div style={container}>
     
      <div style={header}>
        <h1 style={title}>Students</h1>
      </div>
      <div style={tableWrapper}>
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>Name</th>
              <th style={th}>Email</th>
              <th style={th}>Batch</th>
              <th style={th}>Status</th>
              <th style={th}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td style={td}>{student.name}</td>
                <td style={td}>{student.email}</td>
                <td style={td}>{student.batch}</td>
                <td style={td}>
                  <span
                    style={{
                      ...statusBadge,
                      background:
                        student.status === "Active"
                          ? "#dcfce7"
                          : "#fee2e2",
                      color:
                        student.status === "Active"
                          ? "#166534"
                          : "#991b1b",
                    }}
                  >
                    {student.status}
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
