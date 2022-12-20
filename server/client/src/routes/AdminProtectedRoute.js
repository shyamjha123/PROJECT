import React from "react";
import { Navigate } from "react-router-dom";

import { isAdmin } from "src/shared/helpers/isAdmin";
import { isAuthenticate } from "src/shared/helpers/isAuthenticate";

const AdminProtectedRoute = ({ children }) => {
  const isAdminUser = isAuthenticate() && isAdmin();

  if (!isAdminUser) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default AdminProtectedRoute;
