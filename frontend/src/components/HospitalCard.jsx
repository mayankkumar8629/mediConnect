import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

const HospitalCard = ({ hospital }) => {
  const navigate = useNavigate();

  if (!hospital) return null; // Prevents error if hospital is undefined

  return (
    <Card 
      sx={{ 
        maxWidth: 345, 
        cursor: "pointer", 
        margin: 2,
        border: "1px solid rgba(0, 0, 0, 0.1)", // ✅ Light border added
        borderRadius: "10px", // ✅ Slightly rounded edges
        transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease", // ✅ Smooth animation
        "&:hover": {
          transform: "scale(1.05)", // ✅ Slightly enlarges
          boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.2)", // ✅ Soft shadow
          borderColor: "rgba(0, 0, 0, 0.2)", // ✅ Slightly darkens border on hover
        }
      }} 
      onClick={() => navigate(`/hospitals/${hospital._id}`)} // ✅ Navigate to details page
    >
      <CardMedia
        component="img"
        height="200"
        image={hospital.imageUrl || "https://via.placeholder.com/300"} // ✅ Ensure imageUrl is used
        alt={hospital.name || "Hospital Image"}
        sx={{
          transition: "opacity 0.3s ease",
          "&:hover": {
            opacity: 0.9, // ✅ Slight opacity change on hover
          }
        }}
      />
      <CardContent>
      <Typography variant="h6" fontWeight="bold">{hospital.hospitalCode}</Typography>
        <Typography variant="h6" fontWeight="bold">{hospital.name}</Typography>
        <Typography variant="body2" color="textSecondary">
          📍 {hospital.address}
        </Typography>
        <Typography variant="body2" color="primary" fontWeight="bold">
          ⭐ {hospital.rating} / 5
        </Typography>
      </CardContent>
    </Card>
  );
};

export default HospitalCard;
