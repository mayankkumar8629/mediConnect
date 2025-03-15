import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AppBar, Toolbar, Typography, Container, Grid, Card, CardMedia, CardContent } from '@mui/material';

const PharmacyList = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const backend_uri = import.meta.env.VITE_URI; // Using backend_uri from environment

  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const res = await axios.get(`${backend_uri}/pharmacy`); // Using backend_uri here
        if (res.data && res.data.pharmacies) {
          setPharmacies(res.data.pharmacies);
        }
      } catch (error) {
        console.error('Error fetching pharmacies:', error);
      }
    };

    fetchPharmacies();
  }, [backend_uri]);

  return (
    <div>
      {/* Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Pharmacy List</Typography>
        </Toolbar>
      </AppBar>

      {/* Content */}
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          {pharmacies.map(pharmacy => (
            <Grid item xs={12} key={pharmacy._id}>
              <Card sx={{ display: 'flex', p: 2, m: 2, borderRadius: 2 }}>
                {/* Left: Pharmacy Image */}
                <CardMedia
                  component="img"
                  sx={{ width: 150, borderRadius: 1 }}
                  image={pharmacy.imageUrl || 'https://via.placeholder.com/150'}
                  alt={pharmacy.name}
                />
                {/* Right: Pharmacy Details */}
                <CardContent sx={{ ml: 2 }}>
                  <Typography variant="h5" gutterBottom>
                    {pharmacy.name}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {pharmacy.address}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Opening Hours: {pharmacy.openingHours}
                  </Typography>
                  <Typography variant="body2">
                    Contact: {pharmacy.contactNumber}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default PharmacyList;
