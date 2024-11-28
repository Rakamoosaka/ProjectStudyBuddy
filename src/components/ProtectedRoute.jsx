import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../hooks/UserContext"; // Import UserContext hook

const ProtectedRoute = () => {
  const { isLoggedIn } = useUser(); // Access login state

  // If not logged in, redirect to SignIn
  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />;
  }

  // If logged in, allow access to the route
  return <Outlet />;
};

export default ProtectedRoute;
