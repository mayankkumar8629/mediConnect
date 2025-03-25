import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddHospital = () => {
  const navigate = useNavigate();

  const [hospital, setHospital] = useState({
    hospitalCode: "",
    name: "",
    address: "",
    description: "",
    contactNumber: "",
    capacity: "",
    specialties: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    // Optionally trim the input to remove accidental spaces
    setHospital({ ...hospital, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const backend_uri = import.meta.env.VITE_URI;

    // Create the payload with proper conversions
    const payload = {
      ...hospital,
      capacity: Number(hospital.capacity), // Convert capacity to number
      specialties: hospital.specialties.split(",").map((s) => s.trim()), // Convert to array with trimmed values
    };

    console.log("Payload to be sent:", payload);

    try {
      const response = await axios.post(`${backend_uri}/hospital/newhospital`, payload);

      if (response.status === 201) {
        alert("Hospital added successfully!");
        navigate("/"); // Redirect to Home
      }
    } catch (error) {
      console.error("Error adding hospital:", error);
      alert("Failed to add hospital");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Add New Hospital
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Hospital Code"
          name="hospitalCode"
          fullWidth
          required
          onChange={handleChange}
        />
        <TextField
          label="Name"
          name="name"
          fullWidth
          required
          onChange={handleChange}
        />
        <TextField
          label="Address"
          name="address"
          fullWidth
          required
          onChange={handleChange}
        />
        <TextField
          label="Description"
          name="description"
          fullWidth
          required
          onChange={handleChange}
        />
        <TextField
          label="Contact Number"
          name="contactNumber"
          fullWidth
          required
          onChange={handleChange}
        />
        <TextField
          label="Capacity"
          name="capacity"
          fullWidth
          required
          type="number"
          onChange={handleChange}
        />
        <TextField
          label="Specialties (comma separated)"
          name="specialties"
          fullWidth
          required
          onChange={handleChange}
        />
        <TextField
          label="Image URL"
          name="imageUrl"
          fullWidth
          required
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default AddHospital;
