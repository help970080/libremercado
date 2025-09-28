import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function PrivateRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    // si no hay usuario logueado, redirigir a login
    return <Navigate to="/login" replace />;
  }

  return children;
}
