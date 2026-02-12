import { Link, Outlet } from "react-router-dom";

export default function InstructorLayout() {
  return (
    <div style={layout}>
      <aside style={sidebar}>
        <h2 style={logo}>Thaksa</h2>

        <nav style={nav}>
          <NavItem to="/instructor">Dashboard</NavItem>
          <NavItem to="/instructor/batches">Manage Batches</NavItem>
          <NavItem to="/instructor/courses">Manage Courses</NavItem>
          <NavItem to="/instructor/students">Students List</NavItem>
          <NavItem to="/instructor/profile">Profile</NavItem>
          <NavItem to="/instructor/settings">Settings</NavItem>
        </nav>
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
  background: "white",
  padding: "24px 20px",
  borderRight: "1px solid #e5e7eb",
};

const logo = {
  fontSize: "22px",
  fontWeight: "800",
  marginBottom: "30px",
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

const content = {
  flex: 1,
  padding: "32px",
};
