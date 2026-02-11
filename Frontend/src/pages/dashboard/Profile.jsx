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
      <h1 style={title}>My Profile</h1>
      <p style={subtitle}>Manage your personal information</p>

      <div style={card}>
        <div style={field}>
          <label style={label}>Full Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={handleChange}
            name="name"
            placeholder="Full Name"
            style={input}
          />
        </div>

        <div style={field}>
          <label style={label}>Email Address</label>
          <input
            type="email"
            style={{...input, background: "#f1f5f9", cursor: "not-allowed" }}
            name="email"
            value={formData.email}
          />
        </div>

        <div style={field}>
          <label style={label}>Phone Number</label>
          <input
            placeholder="+91 XXXXX XXXXX"
            style={input}
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div style={field}>
          <label style={label}>bio</label>
          <input
            style={{...input, height: "80px" }}
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself"
          />
        </div>

        <div style={field}>
          <label style={label}>Date of Birth</label>
          <input
            type="date"
            style={input}
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
          />
        </div>

        <button style={saveBtn} onClick={handleSave} >
          {loading ? "Saving..." : "Save Changes"}
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
