import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("isAuth");
    navigate("/login");
  }

  return (
    <div>
      <h1 style={title}>Settings</h1>
      <p style={subtitle}>Manage your account preferences</p>

      {/* ACCOUNT */}
      <div style={card}>
        <h3 style={sectionTitle}>Account</h3>

        <button style={actionBtn}>Change Password</button>
        <button style={actionBtn}>Manage Notifications</button>
      </div>

      <div style={card}>
        <h3 style={sectionTitle}>Security</h3>
        <p style={muted}>Last login: Today · Chrome · India</p>

        <button style={dangerBtn}>
          Logout from all devices
        </button>
      </div>

      
      <div style={card}>
        <h3 style={sectionTitle}>Session</h3>
        <button onClick={handleLogout} style={logoutBtn}>
          Logout
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
  padding: "24px",
  borderRadius: "16px",
  marginBottom: "24px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
};

const sectionTitle = {
  fontSize: "18px",
  fontWeight: "700",
  marginBottom: "12px",
};

const actionBtn = {
  display: "block",
  width: "100%",
  textAlign: "left",
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid #e5e7eb",
  background: "#f8fafc",
  cursor: "pointer",
  marginBottom: "10px",
  fontWeight: "500",
};

const dangerBtn = {
  display: "block",
  width: "100%",
  textAlign: "left",
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid #fecaca",
  background: "#fef2f2",
  color: "#b91c1c",
  cursor: "pointer",
  marginTop: "12px",
  fontWeight: "600",
};

const logoutBtn = {
  width: "100%",
  background: "#dc2626",
  color: "white",
  padding: "14px",
  borderRadius: "12px",
  border: "none",
  fontWeight: "600",
  cursor: "pointer",
};

const muted = {
  color: "#64748b",
  fontSize: "14px",
};
