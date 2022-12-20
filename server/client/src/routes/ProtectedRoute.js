import React from "react";
import { Navigate } from "react-router-dom";
import { isAdmin } from "src/shared/helpers/isAdmin";
import { isAuthenticate } from "src/shared/helpers/isAuthenticate";

const ProtectedRoute = ({ children }) => {
  const isLoginUser = isAuthenticate() && !isAdmin();

  if (!isLoginUser) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
