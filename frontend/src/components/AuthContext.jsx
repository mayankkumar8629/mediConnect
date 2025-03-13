// AuthContext.jsx
import React, { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      // Call the backend logout endpoint
      const backend_uri = import.meta.env.VITE_URI;
      const response = await axios.post(
        `${backend_uri}/logout`,
        {},
        { withCredentials: true }
      );
      console.log(response.data.message); // "Logout successful"
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear user state and authentication flag
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
