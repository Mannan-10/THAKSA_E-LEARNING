import { useNavigate } from "react-router-dom";

export default function ForgotPasswordPage() {
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
      {/* BACK TO HOME */}
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

      {/* CARD */}
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
          Reset your password
        </h2>

        <p
          style={{
            color: "#64748b",
            marginBottom: "24px",
            fontSize: "14px",
            lineHeight: "1.6",
          }}
        >
          Enter the email address associated with your account and we’ll send
          you a link to reset your password.
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          style={inputStyle}
        />

        <button style={primaryBtn}>
          Send Reset Link
        </button>

        {/* FOOTER LINKS */}
        <div style={footerLinks}>
          <button
            onClick={() => navigate("/login")}
            style={linkBtn}
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  marginBottom: "20px",
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
  textAlign: "center",
};

const linkBtn = {
  background: "none",
  border: "none",
  color: "#2563eb",
  fontWeight: "600",
  cursor: "pointer",
  fontSize: "14px",
};
