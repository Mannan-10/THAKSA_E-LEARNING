import { Link, Outlet, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuth");
    navigate("/login");
  };

  return (
    <div style={layout}>

      <aside style={sidebar}>
        <h2 style={logo}>Thaksa Admin</h2>

        <nav style={nav}>
          <NavItem to="/admin">Dashboard</NavItem>
          <NavItem to="/admin/batches">Batches</NavItem>
          <NavItem to="/admin/courses">Courses</NavItem>
          <NavItem to="/admin/students">Students</NavItem>
          <NavItem to="/admin/settings">Settings</NavItem>
        </nav>

        <button onClick={handleLogout} style={logoutBtn}>
          Logout
        </button>
      </aside>

      
      <main style={content}>
        <Outlet />
      </main>
    </div>
  );
}

function NavItem({ to, children }) {
  return (
    <Link to={to} style={navItem}>
      {children}
    </Link>
  );
}


const layout = {
  display: "flex",
  minHeight: "100vh",
  background: "#f8fafc",
};

const sidebar = {
  width: "240px",
  background: "#ffffff",
  padding: "24px 20px",
  borderRight: "1px solid #e5e7eb",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const logo = {
  fontSize: "22px",
  fontWeight: "800",
  marginBottom: "32px",
};

const nav = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const navItem = {
  textDecoration: "none",
  fontWeight: "600",
  color: "#334155",
};

const logoutBtn = {
  marginTop: "auto",
  background: "transparent",
  border: "none",
  color: "#dc2626",
  fontWeight: "600",
  cursor: "pointer",
};

const content = {
  flex: 1,
  padding: "32px",
};
