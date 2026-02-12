import React from "react";

export default function InstructorDashboard() {
  const stats = [
    { label: "Active Batches", value: "3", color: "#2563eb" },
    { label: "Total Students", value: "124", color: "#16a34a" },
    { label: "Courses Managed", value: "2", color: "#9333ea" },
    { label: "Pending Assignments", value: "18", color: "#ea580c" },
  ];

  return (
    <div>
      <header style={header}>
        <h1 style={title}>Instructor Dashboard</h1>
        <p style={subtitle}>Welcome back! Here is what's happening with your classes today.</p>
      </header>

      <div style={statsGrid}>
        {stats.map((stat) => (
          <div key={stat.label} style={statCard}>
            <span style={{ ...statValue, color: stat.color }}>{stat.value}</span>
            <span style={statLabel}>{stat.label}</span>
          </div>
        ))}
      </div>

      <div style={sectionContainer}>
        <div style={card}>
          <h3 style={cardTitle}>Upcoming Sessions</h3>
          <div style={list}>
            <SessionItem 
              time="10:00 AM" 
              title="Cloud & DevOps - Batch A" 
              topic="Kubernetes Architecture" 
            />
            <SessionItem 
              time="02:30 PM" 
              title="Full Stack - Batch C" 
              topic="React Context API & Hooks" 
            />
          </div>
        </div>

        <div style={card}>
          <h3 style={cardTitle}>Recent Activity</h3>
          <div style={list}>
            <ActivityItem text="John Doe submitted Assignment 4" time="2 hours ago" />
            <ActivityItem text="New student enrolled in Data Science Batch" time="5 hours ago" />
            <ActivityItem text="Batch B session recording uploaded" time="Yesterday" />
          </div>
        </div>
      </div>
    </div>
  );
}
const cardTitle = {
  fontSize: "18px",
  fontWeight: "700",
  color: "#0f172a",
  marginBottom: "20px",
};

const list = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const listItem = {
  display: "flex",
  gap: "16px",
  padding: "12px 0",
  borderBottom: "1px solid #f1f5f9",
};

const sessionTime = {
  fontSize: "14px",
  fontWeight: "700",
  color: "#2563eb",
  minWidth: "80px",
};

const sessionTitle = {
  fontSize: "15px",
  fontWeight: "600",
  color: "#0f172a",
};

const sessionTopic = {
  fontSize: "13px",
  color: "#64748b",
};

const activityText = {
  fontSize: "14px",
  color: "#334155",
  flex: 1,
};

const activityTime = {
  fontSize: "12px",
  color: "#94a3b8",
};

function SessionItem({ time, title, topic }) {
  return (
    <div style={listItem}>
      <div style={sessionTime}>{time}</div>
      <div>
        <div style={sessionTitle}>{title}</div>
        <div style={sessionTopic}>{topic}</div>
      </div>
    </div>
  );
}

function ActivityItem({ text, time }) {
  return (
    <div style={listItem}>
      <div style={activityText}>{text}</div>
      <div style={activityTime}>{time}</div>
    </div>
  );
}

const header = {
  marginBottom: "32px",
};

const title = {
  fontSize: "28px",
  fontWeight: "800",
  color: "#0f172a",
  margin: 0,
};

const subtitle = {
  color: "#64748b",
  marginTop: "8px",
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "24px",
  marginBottom: "40px",
};

const statCard = {
  background: "white",
  padding: "24px",
  borderRadius: "16px",
  border: "1px solid #e5e7eb",
  display: "flex",
  flexDirection: "column",
  gap: "4px",
};

const statValue = {
  fontSize: "32px",
  fontWeight: "800",
};

const statLabel = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#64748b",
};

const sectionContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
  gap: "24px",
};

const card = {
  background: "white",
  padding: "24px",
  borderRadius: "16px",
  border: "1px solid #e5e7eb",
};