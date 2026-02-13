import { Navigate } from "react-router-dom";

export default function RouteFallback() {
  const token = localStorage.getItem("token");
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    user = null;
  }

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (user?.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  if (user?.role === "instructor") {
    return <Navigate to="/instructor" replace />;
  }

  return <Navigate to="/dashboard" replace />;
}
