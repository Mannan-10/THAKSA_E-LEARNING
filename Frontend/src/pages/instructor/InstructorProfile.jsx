import React, { useState, useEffect } from "react";

export default function InstructorProfile() {
  const [profile, setProfile] = useState({
    name: "Dr. Robert Fox",
    email: "robert.fox@thaksa.edu",
    role: "Senior Instructor",
    bio: "Expert in Cloud Computing and DevOps with over 10 years of industry experience. Passionate about teaching modern software architecture.",
    expertise: ["Cloud Computing", "DevOps", "Kubernetes", "AWS"],
    joinedDate: "January 2023",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  return (
    <div>
      <header style={header}>
        <h1 style={title}>My Profile</h1>
        <p style={subtitle}>Manage your professional information and public bio.</p>
      </header>

      <div style={profileCard}>
        <div style={avatarSection}>
          <div style={avatarCircle}>
            {profile.name.charAt(0)}
          </div>
          <div style={headerInfo}>
            <h2 style={userName}>{profile.name}</h2>
            <span style={userRole}>{profile.role}</span>
          </div>
          <button 
            style={isEditing ? saveBtn : editBtn} 
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </button>
        </div>

        <div style={detailsGrid}>
          <div style={inputGroup}>
            <label style={label}>Full Name</label>
            <input
              style={input}
              type="text"
              value={profile.name}
              disabled={!isEditing} 
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
          </div>

          <div style={inputGroup}>
            <label style={label}>Email Address</label>
            <input
              style={input}
              type="email"
              value={profile.email}
              disabled={!isEditing}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
          </div>

          <div style={inputGroup}>
            <label style={label}>Professional Bio</label>
            <textarea
              style={{ ...input, minHeight: "100px", resize: "vertical" }}
              value={profile.bio}
              disabled={!isEditing}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            />
          </div>

          <div style={inputGroup}>
            <label style={label}>Expertise (comma separated)</label>
            <input
              style={input}
              type="text"
              value={profile.expertise.join(", ")}
              disabled={!isEditing}
              onChange={(e) => setProfile({ ...profile, expertise: e.target.value.split(", ") })}
            />
          </div>
        </div>

        <div style={footerInfo}>
          <span style={joinedText}>Member since {profile.joinedDate}</span>
        </div>
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

const subtitle = {
  color: "#64748b",
  marginTop: "8px",
};

const profileCard = {
  background: "white",
  padding: "32px",
  borderRadius: "16px",
  border: "1px solid #e5e7eb",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
};

const avatarSection = {
  display: "flex",
  alignItems: "center",
  gap: "24px",
  marginBottom: "40px",
  paddingBottom: "32px",
  borderBottom: "1px solid #f1f5f9",
};

const avatarCircle = {
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  background: "#f1e40af",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "32px",
  fontWeight: "700",
};

const headerInfo = {
  flex: 1,
};

const userName = {
  fontSize: "24px",
  fontWeight: "700",
  color: "#0f172a",
  margin: 0,
};

const userRole = {
  color: "#64748b",
  fontSize: "16px",
  fontWeight: "500",
};

const editBtn = {
  padding: "10px 20px",
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  background: "white",
  color: "#0f172a",
  fontWeight: "600",
  cursor: "pointer",
};

const saveBtn = {
  padding: "10px 20px",
  borderRadius: "8px",
  border: "none",
  background: "#2563eb",
  color: "white",
  fontWeight: "600",
  cursor: "pointer",
};

const detailsGrid = {
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  maxWidth: "600px",
};

const inputGroup = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const label = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#475569",
};

const input = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  fontSize: "15px",
  color: "#0f172a",
  background: "#f8fafc",
};

const footerInfo = {
  marginTop: "40px",
  paddingTop: "32px",
  borderTop: "1px solid #f1f5f9",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const joinedText = {
  fontSize: "14px",
  color: "#64748b",
};