import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("isAuth") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isAuth");
    navigate("/login");
  };

  return (
    <header style={header}>
      <div style={container}>
        {/* Logo */}
        <Link to="/" style={logo}>
          Thaksa
        </Link>

        {/* Nav links */}
        <nav style={nav}>
          <Link to="/courses" style={navItem}>Courses</Link>
          <Link to="/batches" style={navItem}>Batches</Link>
          <Link to="/pricing" style={navItem}>Pricing</Link>
          <Link to="/contact" style={navItem}>Contact</Link>
        </nav>

        {/* Auth actions */}
        <div style={actions}>
          {!isAuth ? (
            <>
              <Link to="/login" style={loginBtn}>Login</Link>
              <Link to="/signup" style={signupBtn}>Get Started</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" style={loginBtn}>Dashboard</Link>
              <button onClick={handleLogout} style={logoutBtn}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

/* ===== styles ===== */

const header = {
  position: "sticky",
  top: 0,
  background: "#fff",
  borderBottom: "1px solid #e5e7eb",
  zIndex: 100,
};

const container = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "16px 20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const logo = {
  fontSize: "22px",
  fontWeight: "800",
  textDecoration: "none",
  color: "#0f172a",
};

const nav = {
  display: "flex",
  gap: "24px",
};

const navItem = {
  textDecoration: "none",
  color: "#334155",
  fontWeight: "500",
};

const actions = {
  display: "flex",
  gap: "14px",
  alignItems: "center",
};

const loginBtn = {
  textDecoration: "none",
  fontWeight: "600",
  color: "#2563eb",
};

const signupBtn = {
  textDecoration: "none",
  background: "#2563eb",
  color: "#fff",
  padding: "10px 16px",
  borderRadius: "10px",
  fontWeight: "600",
};

const logoutBtn = {
  background: "transparent",
  border: "none",
  color: "#dc2626",
  fontWeight: "600",
  cursor: "pointer",
};
