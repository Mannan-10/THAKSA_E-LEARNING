import { Link } from "react-router-dom";

export default function MyCourses() {
  return (
    <div>
      <h1 style={title}>My Courses</h1>
      <p style={subtitle}>Track and continue your learning</p>

      <div style={grid}>
        <CourseCard
          title="AWS & DevOps Bootcamp"
          progress={62}
          duration="4 Months"
        />
        <CourseCard
          title="Data Science & ML"
          progress={28}
          duration="5 Months"
        />
      </div>
    </div>
  );
}


function CourseCard({ title, progress, duration }) {
  return (
    <div style={card}>
      <h3>{title}</h3>
      <p style={muted}>{duration}</p>

      <div style={progressWrap}>
        <div style={{ ...progressBar, width: `${progress}%` }} />
      </div>

      <p style={muted}>{progress}% completed</p>

      <Link to="#" style={btn}>
        Continue Learning
      </Link>
    </div>
  );
}



const title = {
  fontSize: "28px",
  fontWeight: "800",
  marginBottom: "6px",
};

const subtitle = {
  color: "#64748b",
  marginBottom: "32px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "24px",
};

const card = {
  background: "white",
  padding: "24px",
  borderRadius: "16px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
};

const progressWrap = {
  height: "8px",
  background: "#e5e7eb",
  borderRadius: "6px",
  overflow: "hidden",
  margin: "14px 0",
};

const progressBar = {
  height: "100%",
  background: "#2563eb",
};

const muted = {
  fontSize: "14px",
  color: "#64748b",
};

const btn = {
  display: "inline-block",
  marginTop: "14px",
  background: "#2563eb",
  color: "white",
  padding: "10px 14px",
  borderRadius: "10px",
  textDecoration: "none",
  fontWeight: "600",
};
