import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f8fafc",
        position: "relative",
      }}
    >
    
      <button
        onClick={() => navigate("/")}
        style={{
          position: "absolute",
          top: "24px",
          left: "24px",
          background: "transparent",
          border: "none",
          fontSize: "20px",
          cursor: "pointer",
          color: "#2563eb",
          fontWeight: "600",
        }}
      >
        ← Back
      </button>

      
      <div
        style={{
          background: "#ffffff",
          padding: "40px",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "420px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
        }}
      >
        <h2 style={{ fontSize: "26px", marginBottom: "8px" }}>
          Create Account
        </h2>
        <p style={{ color: "#64748b", marginBottom: "24px" }}>
          Start your learning journey with Thaksa
        </p>

        <input type="text" placeholder="Full Name" style={inputStyle} />
        <input type="email" placeholder="Email" style={inputStyle} />
        <input type="password" placeholder="Password" style={inputStyle} />

        <button style={primaryBtn}>
          Get Started
        </button>

       
        <div style={footerLinks}>
          <span>
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              style={linkBtn}
            >
              Log in
            </button>
          </span>

          <button
            onClick={() => navigate("/forgot-password")}
            style={forgotBtn}
          >
            Forgot password?
          </button>
        </div>
      </div>
    </div>
  );
}


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
