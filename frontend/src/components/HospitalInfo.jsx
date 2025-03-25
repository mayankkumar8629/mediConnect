import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Grid, Box, Typography, Button } from "@mui/material";

const HospitalInfo = ({ hospital, handleDelete }) => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: "auto", // REMOVE full 100vh height (prevents unnecessary empty space)
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        pt: 5, // Reduced top padding
        pb: 2, // Reduced bottom padding
        mb: 2, // Reduce space between this and the doctors' section
      }}
    >
      <Grid container spacing={3} alignItems="center" justifyContent="center">
        {/* Left Side: Hospital Image */}
        <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center", p: 2 }}>
          <Box
            component="img"
            src={hospital.imageUrl || "https://via.placeholder.com/600"}
            alt={hospital.name}
            sx={{ width: "100%", maxWidth: "400px", height: "auto", objectFit: "cover", borderRadius: 2 }}
            onError={(e) => (e.target.src = "https://via.placeholder.com/600")}
          />
        </Grid>

        {/* Right Side: Hospital Details */}
        <Grid item xs={12} md={6} sx={{ p: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <Typography variant="h4" gutterBottom>{hospital.name}</Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>📍 {hospital.address}</Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>📜 {hospital.description}</Typography>
            <Typography variant="body1" gutterBottom>📞 Contact: {hospital.contactNumber}</Typography>
            <Typography variant="body1" gutterBottom>🏥 Capacity: {hospital.capacity} beds</Typography>
            <Typography variant="body1" color="primary" gutterBottom>
              ⭐ Average Rating:{" "}
              {hospital.ratings.length > 0
                ? (hospital.ratings.reduce((a, b) => a + b, 0) / hospital.ratings.length).toFixed(1)
                : "No ratings yet"}{" "}
              / 5
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Specialties: {hospital.specialties ? hospital.specialties.join(", ") : "N/A"}
            </Typography>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
            <Button variant="contained" color="primary" onClick={() => navigate(`/hospitals/${hospital._id}/edit`)}>
              Edit
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="contained" color="success">Book Appointment</Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HospitalInfo;
