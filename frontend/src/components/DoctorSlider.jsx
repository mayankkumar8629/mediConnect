import React from "react";
import Slider from "react-slick";
import { Card, CardContent, Avatar, Typography, Box, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Default doctor image for missing images
const defaultDoctorImage = "https://via.placeholder.com/150";

const DoctorsSlider = ({ doctors }) => {
  if (!doctors || doctors.length === 0) {
    return <Typography variant="h6" align="center">No doctors available</Typography>;
  }

  // Custom Arrow Components
  const PrevArrow = ({ onClick }) => (
    <IconButton 
      onClick={onClick} 
      sx={{ 
        position: "absolute", 
        left: "-40px", 
        top: "50%", 
        transform: "translateY(-50%)",
        zIndex: 10, 
        backgroundColor: "white", 
        boxShadow: 2,
        "&:hover": { backgroundColor: "grey.300" }
      }}
    >
      <ArrowBackIos />
    </IconButton>
  );

  const NextArrow = ({ onClick }) => (
    <IconButton 
      onClick={onClick} 
      sx={{ 
        position: "absolute", 
        right: "-40px", 
        top: "50%", 
        transform: "translateY(-50%)",
        zIndex: 10, 
        backgroundColor: "white", 
        boxShadow: 2,
        "&:hover": { backgroundColor: "grey.300" }
      }}
    >
      <ArrowForwardIos />
    </IconButton>
  );

  // Slick carousel settings
  const settings = {
    dots: true, // Show navigation dots
    infinite: false, // No infinite looping (prevents duplicates)
    speed: 600,
    slidesToShow: Math.min(doctors.length, 4), // Show up to 4 doctors
    slidesToScroll: 1,
    autoplay: false, // Manual scrolling only
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: Math.min(doctors.length, 3) } },
      { breakpoint: 768, settings: { slidesToShow: Math.min(doctors.length, 2) } },
      { breakpoint: 480, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <Box sx={{ width: "90%", margin: "auto", position: "relative", pb: 2 }}> {/* Reduced bottom spacing */}
      <Typography variant="h5" align="center" gutterBottom>
        Meet Our Doctors
      </Typography>

      <Slider {...settings}>
        {doctors.map((doctor) => (
          <Card 
            key={doctor._id} 
            sx={{
              textAlign: "center", 
              p: 2, 
              m: 1, 
              borderRadius: "12px", 
              transition: "transform 0.3s ease-in-out",
              "&:hover": { transform: "scale(1.05)" }, // Hover effect
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: 3
            }}
          >
            <Avatar
              src={doctor.imageUrl || defaultDoctorImage}
              alt={doctor.name}
              sx={{ width: 90, height: 90, margin: "auto", mb: 1, border: "3px solid #1976D2" }} // Blue border around image
            />
            <CardContent>
              <Typography variant="h6">{doctor.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                {doctor.specialization}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Slider>
    </Box>
  );
};

export default DoctorsSlider;
