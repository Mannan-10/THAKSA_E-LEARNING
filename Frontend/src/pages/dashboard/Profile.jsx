import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../../services/userServices";

export default function Profile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    date_of_birth: "",
  });

  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfile();

        setFormData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          bio: data.bio || "",
          date_of_birth: data.date_of_birth || "",
        });
      } catch (error) {
        console.error(error.response?.data || error.message);
      }
    };
    loadProfile();
  },[]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await updateProfile(formData);
      alert("Profile updated successfully");
    } catch (error) {
      console.error(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <header style={header}>
      <h1 style={title}>My Profile</h1>
      <p style={subtitle}>Manage your personal information</p>
      </header>

      <div style={profileCard}>
        <div style={avatarSection}>
          <div style={avatarCircle}>
            {formData.name.charAt(0)}
          </div>
          <div style={headerInfo}>
            <h2 style={userName}>{formData.name}</h2>
            <span style={userRole}>Student</span>
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
            type="text"
            value={formData.name}
            onChange={handleChange}
            name="name"
            placeholder="Full Name"
            style={input}
            disabled={!isEditing}
          />
        </div>

        <div style={inputGroup}>
          <label style={label}>Email Address</label>
          <input
            type="email"
            style={{...input, background: "#f1f5f9", cursor: "not-allowed" }}
            name="email"
            value={formData.email}
            disabled={!isEditing}
          />
        </div>

        <div style={inputGroup}>
          <label style={label}>Phone Number</label>
          <input
            placeholder="+91 XXXXX XXXXX"
            style={input}
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        <div style={inputGroup}>
          <label style={label}>bio</label>
          <input
            style={{...input, height: "80px" }}
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself"
            disabled={!isEditing}
          />
        </div>

        <div style={inputGroup}>
          <label style={label}>Date of Birth</label>
          <input
            type="date"
            style={input}
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
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
