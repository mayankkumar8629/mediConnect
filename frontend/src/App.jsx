import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HospitalDetails from "./pages/HospitalDetails";
import Navbar from "./components/Navbar";
import EditHospital from "./pages/EditHospitalForm";
import AddHospital from "./pages/AddHospital";
import SignupPage from "./pages/SignPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthProvider from "./components/AuthContext.jsx";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        {/* Navbar added here */}
        <Navbar />
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hospitals/:id"
            element={
              <ProtectedRoute>
                <HospitalDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-hospital"
            element={
              <ProtectedRoute>
                <AddHospital />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hospitals/:id/edit"
            element={
              <ProtectedRoute>
                <EditHospital />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
