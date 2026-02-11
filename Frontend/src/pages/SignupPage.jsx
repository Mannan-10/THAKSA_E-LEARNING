import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setFormData((prev) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      console.log("REGISTER RESPONSE:", data);

      if (res.ok) {
        navigate("/verify-otp", {
          state: {
            email: formData.email,
          },
        });
      } else {
        alert(data.message || "Signup failed");
      }

    } catch (error) {
      console.error("Signup Error:", error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <button onClick={() => navigate("/")} style={backBtn}>
        ← Back
      </button>

      <div style={cardStyle}>
        <h2 style={{ fontSize: "26px", marginBottom: "8px" }}>
          Create Account
        </h2>
        <p style={{ color: "#64748b", marginBottom: "24px" }}>
          Start your learning journey with Thaksa
        </p>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            name="username"
            placeholder="Full Name"
            style={inputStyle}
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            style={inputStyle}
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            style={inputStyle}
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" style={primaryBtn}>
            {loading ? "Creating..." : "Get Started"}
          </button>
        </form>

        <div style={footerLinks}>
          <span>
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              style={linkBtn}
              type="button"
            >
              Log in
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

const containerStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f8fafc",
  position: "relative",
};

const cardStyle = {
  background: "#ffffff",
  padding: "40px",
  borderRadius: "16px",
  width: "100%",
  maxWidth: "420px",
  boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
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


