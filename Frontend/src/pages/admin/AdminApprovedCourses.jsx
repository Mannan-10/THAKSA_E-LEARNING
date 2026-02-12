import { useEffect, useState } from "react";
import { getApprovedCourses } from "../../services/adminServices";

export default function AdminApprovedCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApproved();
  }, []);

  const fetchApproved = async () => {
    try {
      const data = await getApprovedCourses();
      console.log("API Response:", data);
      setCourses(data);
    } catch (error) {
      console.error("Error fetching approved courses:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading approved courses...</p>;
  }

  return (
    <div style={container}>
      <div style={header}>
        <h1 style={title}>Approved Courses</h1>
      </div>

      <div style={tableWrapper}>
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>Title</th>
              <th style={th}>Instructor</th>
              <th style={th}>Category</th>
              <th style={th}>Duration</th>
              <th style={th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {courses.length > 0 ? (
              courses.map((course) => (
                <tr key={course.id}>
                  <td style={td}>{course.title}</td>
                  <td style={td}>{course.instructor_name}</td>
                  <td style={td}>{course.category}</td>
                  <td style={td}>{course.duration}</td>
                  <td style={td}>
                    <span style={approvedBadge}>
                      {course.approval_status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ ...td, textAlign: "center" }}>No approved courses found.</td>
              </tr>
            )}
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

const header = {  display: "flex",
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

const approvedBadge = {
  padding: "4px 10px",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: "600",
  background: "#dcfce7",
  color: "#166534",
};

