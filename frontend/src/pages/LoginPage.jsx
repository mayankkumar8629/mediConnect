import React, { useState, useContext } from "react";
import { Container, Grid, Paper, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext.jsx"; // Ensure AuthContext is correctly imported
import axios from "axios";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // State to handle error messages

  // Handle input changes
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before making the request

    try {
      const backend_uri = import.meta.env.VITE_URI;
      const response = await axios.post(
        `${backend_uri}/login`,
        credentials,
        { withCredentials: true } // Ensures cookies are sent for session authentication
      );

      console.log(response);

      if (response.status === 200) {
        // Use the JSON response from the backend to log in the user
        login(response.data.user);
        // Redirect to the hospitals page after successful login
        navigate("/");
      } else {
        setError(response.data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError(error.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={2} alignItems="center" sx={{ minHeight: "100vh" }}>
        {/* Left Side: Image */}
        <Grid item xs={12} md={6}>
          <img 
            src="https://plus.unsplash.com/premium_vector-1705145447105-9e1d61c7a770?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fG1lZGljYWx8ZW58MHx8MHx8fDA%3D" 
            alt="Hospital" 
            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
          />
        </Grid>

        {/* Right Side: Login Form */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 4 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
              Login to MediConnect
            </Typography>
            {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                margin="normal"
                required
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                margin="normal"
                required
                onChange={handleChange}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Login
              </Button>
            </form>
            <Typography sx={{ mt: 2, textAlign: "center" }}>
              Don't have an account? <Button onClick={() => navigate("/signup")}>Sign Up</Button>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
