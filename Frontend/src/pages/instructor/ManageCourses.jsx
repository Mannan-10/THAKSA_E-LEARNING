import React from "react";

export default function ManageCourses() {
  const courses = [
    {
      id: 1,
      title: "Cloud & DevOps Engineering",
      modules: 12,
      studentsEnrolled: 156,
      lastUpdated: "2 days ago",
      status: "Published",
    },
    {
      id: 2,
      title: "Full Stack Software Engineering",
      modules: 15,
      studentsEnrolled: 210,
      lastUpdated: "1 week ago",
      status: "Published",
    },
    {
      id: 3,
      title: "Advanced System Design",
      modules: 8,
      studentsEnrolled: 0,
      lastUpdated: "In Progress",
      status: "Draft",
    },
  ];

  return (
    <div>
      <header style={header}>
        <div style={headerTop}>
          <h1 style={title}>Manage Courses</h1>
          <button style={addBtn}>+ Create New Course</button>
        </div>
        <p style={subtitle}>Create, edit, and organize your course curriculum and materials.</p>
      </header>

      <div style={courseList}>
        {courses.map((course) => (
          <div key={course.id} style={courseCard}>
            <div style={courseInfo}>
              <h3 style={courseTitle}>{course.title}</h3>
              <div style={metaRow}>
                <span style={metaItem}>📚 {course.modules} Modules</span>
                <span style={metaItem}>👥 {course.studentsEnrolled} Students</span>
                <span style={metaItem}>🕒 Updated {course.lastUpdated}</span>
              </div>
            </div>

            <div style={courseStatus}>
              <span style={getStatusStyle(course.status)}>{course.status}</span>
              <div style={actionGroup}>
                <button style={iconBtn}>Edit</button>
                <button style={iconBtn}>Content</button>
                <button style={iconBtn}>Analytics</button>
              </div>
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
  background: status === "Published" ? "#dcfce7" : "#fef9c3",
  color: status === "Published" ? "#166534" : "#854d0e",
});

const header = {
  marginBottom: "32px",
};

const headerTop = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "8px",
};

const title = {
  fontSize: "28px",
  fontWeight: "800",
  color: "#0f172a",
  margin: 0,
};

const subtitle = {
  color: "#64748b",
  margin: 0,
};

const addBtn = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "8px",
  fontWeight: "600",
  cursor: "pointer",
  fontSize: "14px",
};

const courseList = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const courseCard = {
  background: "white",
  padding: "24px",
  borderRadius: "16px",
  border: "1px solid #e5e7eb",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
};

const courseInfo = {
  flex: 1,
};

const courseTitle = {
  fontSize: "18px",
  fontWeight: "700",
  color: "#0f172a",
  margin: "0 0 8px",
};

const metaRow = {
  display: "flex",
  gap: "20px",
  flexWrap: "wrap",
};

const metaItem = {
  fontSize: "14px",
  color: "#64748b",
  display: "flex",
  alignItems: "center",
  gap: "6px",
};

const courseStatus = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  gap: "16px",
};

const actionGroup = {
  display: "flex",
  gap: "8px",
};

const iconBtn = {
  padding: "6px 12px",
  borderRadius: "6px",
  border: "1px solid #e2e8f0",
  background: "white",
  fontSize: "13px",
  fontWeight: "600",
  color: "#475569",
  cursor: "pointer",
  transition: "all 0.2s",
};
