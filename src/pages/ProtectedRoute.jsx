import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = () => {
  const { auth } = useAuth();
  const token = localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
