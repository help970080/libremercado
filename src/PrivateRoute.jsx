// src/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";

function PrivateRoute({ children, restricted = false }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (restricted && !user.membershipActive) {
    return <Navigate to="/membership" replace />;
  }

  return children;
}

export default PrivateRoute;
