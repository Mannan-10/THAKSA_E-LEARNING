import { useEffect, useState } from "react";
import { adminDashboard } from "../../services/adminServices";
import "./Admin.css";

import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await adminDashboard(token);
        setStats(res);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  console.log(stats);
  

  return (
    <div>
      <h1 style={title}>Admin Dashboard</h1>
      <p style={subtitle}>Platform overview & control</p>

      <div style={grid}>
        <Stat label="Total Users" value={stats.users.total} icon={<PeopleIcon />} color="#3b82f6" />
        <Stat label="Students" value={stats.users.students} icon={<SchoolIcon />} color="#3b82f6"/>
        <Stat label="Instructors" value={stats.users.instructors} icon={<PeopleIcon />} color="#6366f1" />

        <Stat label="Total Courses" value={stats.courses.total} icon={<MenuBookIcon />} color="#0ea5e9" />
        <Stat label="Pending Courses" value={stats.courses.pending} icon={<PendingActionsIcon />} color="#dc2626"/>
        <Stat label="Approved Courses" value={stats.courses.approved} icon={<CheckCircleIcon />} color="#16a34a" />

        <Stat label="Total Enrollments" value={stats.enrollments} icon={<SchoolIcon />} color="#8b5cf6"/>
        <Stat label="Total Revenue" value={stats.revenue} icon={<AttachMoneyIcon />} color="#059669"/>

      </div>
    </div>
  );
}

function Stat({ label, value, icon, color }) {
  const [displayValue, setDisplayValue] = useState(0);
  const numericValue = Number(value);

  useEffect(() => {
    let start = 0;
    const duration = 1000; // animation time
    const increment = numericValue / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= numericValue) {
        clearInterval(counter);
        setDisplayValue(numericValue);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [numericValue]);

  return (
    <div
      style={{
        ...card,
        borderTop: `4px solid ${color}`,
      }}
      className="stat-card"
    >
      <div style={cardHeader}>
        <div style={{ ...iconWrapper, background: color }}>
          {icon}
        </div>
        <p style={muted}>{label}</p>
      </div>

      <h2 style={{ ...valueStyle, color }}>
        {typeof value === "string" && value.includes("₹")
          ? `₹ ${displayValue}`
          : displayValue}
      </h2>
    </div>
  );
}


const title = {
  fontSize: "28px",
  fontWeight: "800",
};

const subtitle = {
  color: "#64748b",
  marginBottom: "32px",
};

const cardHeader = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginBottom: "16px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "20px",
};

const card = {
  background: "white",
  padding: "24px",
  borderRadius: "16px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
  transition: "0.3s ease",
};

const iconWrapper = {
  width: "40px",
  height: "40px",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
};

const muted = {
  color: "#64748b",
  fontSize: "14px",
  fontWeight: "500",
};

const valueStyle = {
  fontSize: "28px",
  fontWeight: "800",
};
