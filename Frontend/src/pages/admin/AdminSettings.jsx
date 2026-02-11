export default function AdminSettings() {
  return (
    <div style={container}>
      <h1 style={title}>Settings</h1>
      <p style={subtitle}>
        Manage your admin profile and platform preferences
      </p>

   
      <div style={card}>
        <h3 style={cardTitle}>Admin Profile</h3>

        <div style={fieldGroup}>
          <label style={label}>Name</label>
          <input
            type="text"
            value="Admin User"
            disabled
            style={input}
          />
        </div>

        <div style={fieldGroup}>
          <label style={label}>Email</label>
          <input
            type="email"
            value="admin@thaksa.com"
            disabled
            style={input}
          />
        </div>
      </div>

      <div style={card}>
        <h3 style={cardTitle}>Platform Settings</h3>
        <p style={muted}>
          Platform-level configurations will appear here in future.
        </p>
      </div>
    </div>
  );
}



const container = {
  display: "flex",
  flexDirection: "column",
  gap: "24px",
};

const title = {
  fontSize: "26px",
  fontWeight: "800",
};

const subtitle = {
  color: "#64748b",
  fontSize: "14px",
};

const card = {
  background: "#ffffff",
  padding: "24px",
  borderRadius: "16px",
  border: "1px solid #e5e7eb",
  maxWidth: "520px",
};

const cardTitle = {
  fontSize: "18px",
  fontWeight: "700",
  marginBottom: "16px",
};

const fieldGroup = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  marginBottom: "14px",
};

const label = {
  fontSize: "14px",
  fontWeight: "600",
};

const input = {
  padding: "10px 12px",
  borderRadius: "10px",
  border: "1px solid #e5e7eb",
  background: "#f8fafc",
};

const muted = {
  color: "#64748b",
  fontSize: "14px",
};
