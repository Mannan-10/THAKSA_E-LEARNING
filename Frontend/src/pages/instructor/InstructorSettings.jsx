import React, { useState } from "react";

export default function InstructorSettings() {
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    studentSubmissions: true,
    batchUpdates: false,
    marketing: false,
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
  });

  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div>
      <header style={header}>
        <h1 style={title}>Settings</h1>
        <p style={subtitle}>Manage your account preferences and security settings.</p>
      </header>

      <div style={settingsContainer}>
        <section style={section}>
          <h3 style={sectionTitle}>Notifications</h3>
          <div style={optionsList}>
            <div style={optionItem}>
              <div>
                <div style={optionLabel}>Email Notifications</div>
                <div style={optionDesc}>Receive general updates via email.</div>
              </div>
              <input 
                type="checkbox" 
                checked={notifications.emailAlerts} 
                onChange={() => toggleNotification("emailAlerts")}
              />
            </div>

            <div style={optionItem}>
              <div>
                <div style={optionLabel}>Student Submissions</div>
                <div style={optionDesc}>Get notified when students submit assignments.</div>
              </div>
              <input 
                type="checkbox" 
                checked={notifications.studentSubmissions} 
                onChange={() => toggleNotification("studentSubmissions")}
              />
            </div>

            <div style={optionItem}>
              <div>
                <div style={optionLabel}>Batch Updates</div>
                <div style={optionDesc}>Notifications about schedule changes.</div>
              </div>
              <input 
                type="checkbox" 
                checked={notifications.batchUpdates} 
                onChange={() => toggleNotification("batchUpdates")}
              />
            </div>
          </div>
        </section>

        <section style={section}>
          <h3 style={sectionTitle}>Security</h3>
          <div style={optionsList}>
            <div style={optionItem}>
              <div>
                <div style={optionLabel}>Two-Factor Authentication</div>
                <div style={optionDesc}>Add an extra layer of security to your account.</div>
              </div>
              <input 
                type="checkbox" 
                checked={security.twoFactor} 
                onChange={() => setSecurity({ ...security, twoFactor: !security.twoFactor })}
              />
            </div>
          </div>
        </section>
          <section style={section}>
          <h3 style={sectionTitle}>Account Actions</h3>
          <div style={optionsList}>
            <div style={optionItem}>
              <div>
                <div style={optionLabel}>Session Management</div>
                <div style={optionDesc}>Sign out of your account from this device.</div>
              </div>
              <button 
                style={logoutBtn}
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/login";
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

const header = {
  marginBottom: "32px",
};

const title = {
  fontSize: "28px",
  fontWeight: "800",
  color: "#0f172a",
  margin: 0,
};

const logoutBtn = {
  padding: "10px 24px",
  borderRadius: "8px",
  border: "none",
  background: "#ef4444",
  color: "white",
  fontWeight: "600",
  fontSize: "14px",
  cursor: "pointer",
  transition: "background 0.2s",
};

const subtitle = {
  color: "#64748b",
  marginTop: "8px",
};

const settingsContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "32px",
  maxWidth: "800px",
};

const section = {
  background: "white",
  padding: "24px",
  borderRadius: "16px",
  border: "1px solid #e5e7eb",
};

const sectionTitle = {
  fontSize: "18px",
  fontWeight: "700",
  color: "#0f172a",
  marginBottom: "20px",
};

const optionsList = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const optionItem = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingBottom: "16px",
  borderBottom: "1px solid #f1f5f9",
};

const optionLabel = {
  fontSize: "15px",
  fontWeight: "600",
  color: "#0f172a",
};

const optionDesc = {
  fontSize: "13px",
  color: "#64748b",
  marginTop: "2px",
};
