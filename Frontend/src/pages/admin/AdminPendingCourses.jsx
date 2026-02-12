import { useEffect, useState } from "react";
import { getPendingCourses, approveCourse, rejectCourse } from "../../services/adminServices";

export const AdminPendingCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = async () => {
    try {
      const data = await getPendingCourses();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching pending courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    if (window.confirm("Are you sure you want to approve this course?")) {
      try {
        await approveCourse(id);
        setCourses(courses.filter((c) => c.id !== id));
        alert("Course approved successfully");
      } catch (error) {
        alert("Failed to approve course");
      }
    }
  };

  const handleReject = async (id) => {
    if (window.confirm("Are you sure you want to reject this course?")) {
      try {
        await rejectCourse(id);
        setCourses(courses.filter((c) => c.id !== id));
        alert("Course rejected");
      } catch (error) {
        alert("Failed to reject course");
      }
    }
  };

  if (loading) return <p>Loading pending courses...</p>;

  return (
    <div style={container}>
      <div style={header}>
        <h1 style={title}>Pending Approvals</h1>
      </div>

      <div style={tableWrapper}>
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>Title</th>
              <th style={th}>Instructor</th>
              <th style={th}>Category</th>
              <th style={th}>Status</th>
              <th style={th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.length > 0 ? (
              courses.map((course) => (
                <tr key={course.id}>
                  <td style={td}>{course.title}</td>
                  <td style={td}>{course.instructor_name}</td>
                  <td style={td}>{course.category}</td>
                  <td style={td}>
                    <span style={pendingBadge}>{course.approval_status}</span>
                  </td>
                  <td style={td}>
                    <button
                      style={approveBtn}
                      onClick={() => handleApprove(course.id)}
                    >
                      Approve
                    </button>
                    <button
                      style={rejectBtn}
                      onClick={() => handleReject(course.id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ ...td, textAlign: "center" }}>
                  No pending courses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

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

const approveBtn = {
  background: "#dcfce7",
  color: "#166534",
  border: "none",
  padding: "6px 12px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
  marginRight: "8px",};

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
