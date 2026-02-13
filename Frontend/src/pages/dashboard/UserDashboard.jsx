import { useEffect, useState } from "react";
import { getUserDashboard } from "../../services/userServices";

export default function UserDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  },[]);

  const fetchDashboard = async () => {
    try {
      const res = await getUserDashboard();
      console.log("User Dashboard response",res);
      setData(res);
    } catch (error) {
      console.error("Dashboard error:",error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  return (
 <div style={{ padding: "40px" }}>
      <h2>Welcome Back 👋</h2>

      {/* Stats Section */}
      <div style={statsContainer}>
        <StatCard label="Total Enrolled" value={data.stats.totalEnrolled} />
        <StatCard label="Completed" value={data.stats.completedCourses} />
        <StatCard label="Ongoing" value={data.stats.ongoingCourses} />
      </div>

      {/* Enrolled Courses */}
      <div style={{ marginTop: "40px" }}>
        <h3>Your Courses</h3>

        {data.enrolledCourses.length === 0 ? (
          <p>You have not enrolled in any courses yet.</p>
        ) : (
          <div style={courseGrid}>
            {data.enrolledCourses.map((course) => (
              <div key={course.id} style={courseCard}>
                <h4>{course.title}</h4>
                <p>Instructor: {course.instructor}</p>

                <div style={progressBarContainer}>
                  <div
                    style={{
                      ...progressBar,
                      width: `${course.progress}%`,
                    }}
                  />
                </div>

                <p>{course.progress}% Completed</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div style={statCard}>
      <h3>{value}</h3>
      <p>{label}</p>
    </div>
  );
}
const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "20px",
  marginBottom: "32px",
};

const statsContainer = {
  display: "flex",
  gap: "20px",
  marginTop: "20px",
};

const statCard = {
  flex: 1,
  padding: "20px",
  background: "#ffffff",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  textAlign: "center",
};

const courseGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  gap: "20px",
  marginTop: "20px",
};

const courseCard = {
  padding: "20px",
  background: "#ffffff",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
};

const progressBarContainer = {
  height: "8px",
  background: "#e5e7eb",
  borderRadius: "4px",
  margin: "10px 0",
};

const progressBar = {
  height: "8px",
  background: "#2563eb",
  borderRadius: "4px",
};

const card = {
  background: "white",
  padding: "24px",
  borderRadius: "16px",
  boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
};

const cardTitle = {
  fontSize: "18px",
  fontWeight: "700",
};


const progressFill = {
  height: "100%",
  background: "#2563eb",
};
