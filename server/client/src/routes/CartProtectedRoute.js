import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticate } from "src/shared/helpers/isAuthenticate";

const CartProtectedRoute = ({ children }) => {
  const isLoginUser =
    JSON.parse(localStorage.getItem("cart")).length !== 0 && isAuthenticate();

  if (!isLoginUser) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default CartProtectedRoute;
