import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthProvider, { AuthContext } from "../components/AuthContext.jsx";


const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
