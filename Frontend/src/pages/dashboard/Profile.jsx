export default function Profile() {
  return (
    <div>
      <h1 style={title}>My Profile</h1>
      <p style={subtitle}>Manage your personal information</p>

      <div style={card}>
        <div style={field}>
          <label style={label}>Full Name</label>
          <input
            type="text"
            defaultValue="Muhammad Minhaj"
            style={input}
          />
        </div>

        <div style={field}>
          <label style={label}>Email Address</label>
          <input
            type="email"
            defaultValue="minhajmuhammad229@email.com"
            style={input}
          />
        </div>

        <div style={field}>
          <label style={label}>Phone Number</label>
          <input
            type="tel"
            placeholder="+91 XXXXX XXXXX"
            style={input}
          />
        </div>

        <div style={field}>
          <label style={label}>Password</label>
          <input
            type="password"
            placeholder="********"
            style={input}
          />
        </div>

        <button style={saveBtn}>
          Save Changes
        </button>
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
  padding: "28px",
  borderRadius: "16px",
  maxWidth: "520px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
};

const field = {
  marginBottom: "18px",
};

const label = {
  display: "block",
  fontSize: "14px",
  fontWeight: "600",
  marginBottom: "6px",
};

const input = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid #e5e7eb",
  fontSize: "14px",
};

const saveBtn = {
  marginTop: "12px",
  background: "#2563eb",
  color: "white",
  padding: "12px 20px",
  borderRadius: "12px",
  border: "none",
  fontWeight: "600",
  cursor: "pointer",
};
