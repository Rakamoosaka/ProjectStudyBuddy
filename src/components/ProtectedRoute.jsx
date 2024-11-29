import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../hooks/UserContext";
import { jwtDecode } from "jwt-decode"; // Use a library to decode JWTs

const ProtectedRoute = () => {
  const { isLoggedIn } = useUser(); // Access login state

  // Check if the token is valid and not expired
  const token = localStorage.getItem("jwt");
  let isTokenValid = false;

  if (token) {
    try {
      const decodedToken = jwtDecode(token); // Decode the token
      const currentTime = Date.now() / 1000; // Current time in seconds
      isTokenValid = decodedToken.exp > currentTime; // Check expiration
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  // If not logged in or token is invalid, redirect to SignIn
  if (!isLoggedIn || !isTokenValid) {
    return <Navigate to="/signin" replace />;
  }

  // If logged in and token is valid, allow access to the route
  return <Outlet />;
};

export default ProtectedRoute;
