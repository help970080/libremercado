// src/PrivateRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext.jsx";

function PrivateRoute({ children, restricted = false }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (restricted && !user.membershipActive) {
    return <Navigate to="/membership" />;
  }

  return children;
}

export default PrivateRoute;
