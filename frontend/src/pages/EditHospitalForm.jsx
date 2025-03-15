import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Container, Typography } from "@mui/material";

const EditHospitalForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hospital, setHospital] = useState({
    hospitalCode:"",
    name: "",
    address: "",
    description:"",
    contactNumber: "",
    capacity: "",
    specialties: "",
    imageUrl: "",
  });
  const backend_uri = import.meta.env.VITE_URI;

  useEffect(() => {
    axios
      .get(`${backend_uri}/hospital/get/${id}`)
      .then((response) => {
        const data = response.data;
        setHospital({
          hospitalCode:data.hospitalCode,
          name: data.name,
          address: data.address,
          description: data.description,
          contactNumber: data.contactNumber,
          capacity: data.capacity,
          specialties: data.specialties.join(", "), // Convert array to string
          imageUrl: data.imageUrl,
        });
      })
      .catch((error) => console.error("Error fetching hospital:", error));
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    setHospital({ ...hospital, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${backend_uri}/hospital/update/${id}`, {
        ...hospital,
        specialties: hospital.specialties.split(",").map((s) => s.trim()), // Convert back to array
      });
      alert("Hospital updated successfully!");
      navigate(`/hospitals/${id}`); // Redirect to details page
    } catch (error) {
      console.error("Error updating hospital:", error);
      alert("Failed to update hospital!");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center">Edit Hospital</Typography>
      <form onSubmit={handleSubmit}>
      <TextField fullWidth margin="normal" label="HospitalCode" name="hospitalCode" value={hospital.hospitalCode} onChange={handleChange} required />
        <TextField fullWidth margin="normal" label="Name" name="name" value={hospital.name} onChange={handleChange} required />
        <TextField fullWidth margin="normal" label="Address" name="address" value={hospital.address} onChange={handleChange} required />
        <TextField fullWidth margin="normal" label="Description" name="description" value={hospital.description} onChange={handleChange} required />
        <TextField fullWidth margin="normal" label="Contact Number" name="contactNumber" value={hospital.contactNumber} onChange={handleChange} required />
        <TextField fullWidth margin="normal" type="number" label="Capacity" name="capacity" value={hospital.capacity} onChange={handleChange} required />
        <TextField fullWidth margin="normal" label="Specialties (comma-separated)" name="specialties" value={hospital.specialties} onChange={handleChange} required />
        <TextField fullWidth margin="normal" label="Image URL" name="imageUrl" value={hospital.imageUrl} onChange={handleChange} required />

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Save Changes</Button>
      </form>
    </Container>
  );
};

export default EditHospitalForm;
