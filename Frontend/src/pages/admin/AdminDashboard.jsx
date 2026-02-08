export default function AdminDashboard() {
  return (
    <div>
      <h1 style={title}>Admin Dashboard</h1>
      <p style={subtitle}>Platform overview & control</p>

      <div style={grid}>
        <Stat label="Total Students" value="124" />
        <Stat label="Active Batches" value="4" />
        <Stat label="Courses" value="6" />
        <Stat label="Trainers" value="3" />
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div style={card}>
      <p style={muted}>{label}</p>
      <h2 style={valueStyle}>{value}</h2>
    </div>
  );
}



const title = {
  fontSize: "28px",
  fontWeight: "800",
};

const subtitle = {
  color: "#64748b",
  marginBottom: "32px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "20px",
};

const card = {
  background: "white",
  padding: "24px",
  borderRadius: "16px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
};

const muted = {
  color: "#64748b",
};

const valueStyle = {
  fontSize: "28px",
  fontWeight: "800",
};
