export default function UserDashboard() {
  return (
    <div>
  
      <h1 style={{ fontSize: "28px", fontWeight: "800", marginBottom: "8px" }}>
        Welcome back 👋
      </h1>
      <p style={{ color: "#64748b", marginBottom: "32px" }}>
        Continue your learning journey with Thaksa
      </p>

    
      <div style={statsGrid}>
        <StatCard title="Active Courses" value="3" />
        <StatCard title="Current Batch" value="DevOps + AWS" />
        <StatCard title="Progress" value="62%" />
        <StatCard title="Upcoming Sessions" value="2" />
      </div>


      <div style={card}>
        <h3 style={cardTitle}>Currently Learning</h3>

        <div style={{ marginTop: "16px" }}>
          <p style={{ fontWeight: "600" }}>
            AWS & DevOps Professional Bootcamp
          </p>
          <p style={{ color: "#64748b", fontSize: "14px" }}>
            Next session: Tomorrow at 7:00 PM
          </p>

          <div style={progressBar}>
            <div style={{ ...progressFill, width: "62%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}


const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "20px",
  marginBottom: "32px",
};

function StatCard({ title, value }) {
  return (
    <div style={statCard}>
      <p style={{ fontSize: "14px", color: "#64748b" }}>{title}</p>
      <h2 style={{ fontSize: "26px", fontWeight: "800" }}>{value}</h2>
    </div>
  );
}

const statCard = {
  background: "white",
  padding: "20px",
  borderRadius: "14px",
  boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
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

const progressBar = {
  marginTop: "14px",
  height: "8px",
  background: "#e5e7eb",
  borderRadius: "6px",
  overflow: "hidden",
};

const progressFill = {
  height: "100%",
  background: "#2563eb",
};
