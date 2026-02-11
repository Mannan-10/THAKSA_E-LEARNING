import { Navigate } from "react-router-dom";

export default function PublicOnlyRoute({ children }) {
  const token = localStorage.getItem("accessToken");

  if (token) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}
