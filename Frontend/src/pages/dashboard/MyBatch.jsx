export default function MyBatch() {
  return (
    <div>
      <h1 style={title}>My Batch</h1>
      <p style={subtitle}>Your assigned training batch details</p>

     
      <div style={card}>
        <h3>AWS • DevOps • Data Science Bootcamp</h3>
        <p style={muted}>Batch Duration: 4 Months</p>

        <div style={infoGrid}>
          <Info label="Batch Code" value="THK-DEV-0425" />
          <Info label="Start Date" value="15 April 2025" />
          <Info label="Schedule" value="Mon–Sat · 7:00–9:00 PM" />
          <Info label="Mode" value="Live + Recorded" />
        </div>
      </div>

      <div style={card}>
        <h3>Trainer</h3>
        <p style={{ fontWeight: "600" }}>Tharunkrishna Kaithoju</p>
        <p style={muted}>
          Senior DevOps • Cloud • Data & ML Instructor
        </p>
      </div>

      <div style={card}>
        <h3>Batch Guidelines</h3>
        <ul style={list}>
          <li>Attendance is mandatory for live sessions</li>
          <li>Assignments must be submitted on time</li>
          <li>Recordings available for revision</li>
          <li>Weekly doubt-clearing sessions</li>
        </ul>
      </div>
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

const card = {
  background: "white",
  padding: "24px",
  borderRadius: "16px",
  marginBottom: "24px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
};

const infoGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "16px",
  marginTop: "16px",
};

function Info({ label, value }) {
  return (
    <div>
      <p style={muted}>{label}</p>
      <p style={{ fontWeight: "600" }}>{value}</p>
    </div>
  );
}

const muted = {
  color: "#64748b",
  fontSize: "14px",
};

const list = {
  paddingLeft: "18px",
  lineHeight: "1.8",
};
