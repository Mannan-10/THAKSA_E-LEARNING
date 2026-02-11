import { Link, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div style={layout}>
   
      <aside style={sidebar}>
        <h2 style={logo}>Thaksa</h2>

        <nav style={nav}>
          <NavItem to="/dashboard">Dashboard</NavItem>
          <NavItem to="/dashboard/courses">My Courses</NavItem>
          <NavItem to="/dashboard/batch">My Batch</NavItem>
          <NavItem to="/dashboard/profile">Profile</NavItem>
          <NavItem to="/dashboard/settings">Settings</NavItem>
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
