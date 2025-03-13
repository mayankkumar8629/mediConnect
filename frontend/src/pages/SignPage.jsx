import React, { useState } from "react";
import { Container, Grid, Paper, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    city: "",
    mobileNumber: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const backend_uri = import.meta.env.VITE_URI;
      const response = await fetch(`${backend_uri}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userDetails),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("User Registered:", data);
        navigate("/login");
      } else {
        console.error("Signup failed:", data.message);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={2} alignItems="center" sx={{ minHeight: "100vh" }}>
        {/* Left Side: Image */}
        <Grid item xs={12} md={6}>
          <img 
            src="https://plus.unsplash.com/premium_vector-1705145447105-9e1d61c7a770?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fG1lZGljYWx8ZW58MHx8MHx8fDA%3D" 
            alt="Medical" 
            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
          />
        </Grid>

        {/* Right Side: Signup Form */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 4 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
              Create an Account
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField fullWidth label="Name" name="name" margin="normal" required onChange={handleChange} />
              <TextField fullWidth label="Email" name="email" type="email" margin="normal" required onChange={handleChange} />
              <TextField fullWidth label="City" name="city" margin="normal" required onChange={handleChange} />
              <TextField fullWidth label="Mobile Number" name="mobileNumber" type="tel" margin="normal" required onChange={handleChange} />
              <TextField fullWidth label="Password" name="password" type="password" margin="normal" required onChange={handleChange} />
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Sign Up
              </Button>
            </form>
            <Typography sx={{ mt: 2, textAlign: "center" }}>
              Already have an account? <Button onClick={() => navigate("/login")}>Login</Button>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignupPage;
