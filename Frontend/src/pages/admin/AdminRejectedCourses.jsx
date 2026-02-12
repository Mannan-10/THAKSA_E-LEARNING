import React, { useEffect, useState } from 'react'
import { getRejectedCourses } from '../../services/adminServices';

export const AdminRejectedCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRejected();
    }, []);

    const fetchRejected = async () => {
        try {
            const data = await getRejectedCourses();
            console.log(data);
            setCourses(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
  return (
    <div style={{ padding: "20px" }}>
      <h2>Rejected Courses</h2>

      {courses.length === 0 ? (
        <p>No rejected courses found.</p>
      ) : (
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>Title</th>
              <th style={th}>Instructor</th>
              <th style={th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td style={td}>{course.title}</td>
                <td style={td}>{course.instructor_name}</td>
                <td style={td}>
                  <span style={rejectedBadge}>Rejected</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

const table = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px",
};

const th = {
  textAlign: "left",
  padding: "12px",
  background: "#f1f5f9",
};

const td = {
  padding: "12px",
  borderTop: "1px solid #e5e7eb",
};


const rejectedBadge = {
  background: "#fee2e2",
  color: "#991b1b",
  padding: "4px 10px",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: "600",
};
