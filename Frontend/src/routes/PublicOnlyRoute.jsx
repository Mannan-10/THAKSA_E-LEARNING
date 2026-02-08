import { Navigate } from "react-router-dom";

export default function PublicOnlyRoute({ children }) {
  const isAuth = localStorage.getItem("isAuth") === "true";

  if (isAuth) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
