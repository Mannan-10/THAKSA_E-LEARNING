import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LoginPage() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData(
      {
        ...formData,
        [e.target.name]: e.target.value,
      },
    )
  }

  const handleLogin = async(e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      })

      const data = await res.json();
      console.log("LOGIN RESPONSE:", data);

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        navigate("/dashboard");

      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during login.");
    }
  };

  return (
        <div style={containerStyle}>
      <button onClick={() => navigate("/")} style={backBtn}>
        ← Back
      </button>

      <div style={cardStyle}>
        <h2>Welcome Back</h2>
        <p style={{ color: "#64748b" }}>
          Login to continue your learning journey
        </p>

        <form onSubmit={handleLogin}>
          <input
            type="email" 
            name="email"
            placeholder="Email"
            required
            style={inputStyle}
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            style={inputStyle}
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit" style={primaryBtn}>
            Login
          </button>
        </form>

        <div style={footerLinks}>
          <span>
            Don’t have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              style={linkBtn}
              type="button"
            >
              Sign up
            </button>
          </span>

          <button
            onClick={() => navigate("/forgot-password")}
            style={forgotBtn}
            type="button"
          >
            Forgot password?
          </button>
        </div>
      </div>
    </div>
  );
}

/* ===== STYLES ===== */

const containerStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f8fafc",
  position: "relative",
};

const backBtn = {
  position: "absolute",
  top: "24px",
  left: "24px",
  background: "transparent",
  border: "none",
  fontSize: "20px",
  cursor: "pointer",
  color: "#2563eb",
  fontWeight: "600",
};

const cardStyle = {
  background: "#ffffff",
  padding: "40px",
  borderRadius: "16px",
  width: "100%",
  maxWidth: "420px",
  boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
};


const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  marginBottom: "16px",
  borderRadius: "10px",
  border: "1px solid #e5e7eb",
  fontSize: "14px",
};

const primaryBtn = {
  width: "100%",
  background: "#2563eb",
  color: "white",
  padding: "14px",
  borderRadius: "12px",
  border: "none",
  fontWeight: "600",
  cursor: "pointer",
};

const footerLinks = {
  marginTop: "20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "14px",
  color: "#475569",
};

const linkBtn = {
  background: "none",
  border: "none",
  color: "#2563eb",
  fontWeight: "600",
  cursor: "pointer",
  padding: 0,
};

const forgotBtn = {
  background: "none",
  border: "none",
  color: "#64748b",
  fontSize: "14px",
  cursor: "pointer",
  padding: 0,
};
