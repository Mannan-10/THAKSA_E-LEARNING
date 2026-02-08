export default function AdminCourses() {
  const courses = [
    {
      id: 1,
      title: "DevOps & Cloud Engineering",
      category: "DevOps",
      duration: "4 Months",
      status: "Active",
    },
    {
      id: 2,
      title: "Data Science & Machine Learning",
      category: "Data Science",
      duration: "5 Months",
      status: "Draft",
    },
    {
      id: 3,
      title: "AWS Cloud Practitioner",
      category: "Cloud",
      duration: "2 Months",
      status: "Active",
    },
  ];

  return (
    <div style={container}>
 
      <div style={header}>
        <h1 style={title}>Courses</h1>
        <button style={primaryBtn}>+ Add Course</button>
      </div>

    
      <div style={tableWrapper}>
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>Course Title</th>
              <th style={th}>Category</th>
              <th style={th}>Duration</th>
              <th style={th}>Status</th>
              <th style={th}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td style={td}>{course.title}</td>
                <td style={td}>{course.category}</td>
                <td style={td}>{course.duration}</td>
                <td style={td}>
                  <span
                    style={{
                      ...statusBadge,
                      background:
                        course.status === "Active"
                          ? "#dcfce7"
                          : "#fef3c7",
                      color:
                        course.status === "Active"
                          ? "#166534"
                          : "#92400e",
                    }}
                  >
                    {course.status}
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
  color: "white",
  border: "none",
  padding: "10px 16px",
  borderRadius: "10px",
  fontWeight: "600",
  cursor: "pointer",
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
