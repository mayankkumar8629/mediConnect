import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Fab
} from '@mui/material';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import BuyMedicineOverlay from '../components/BuyMedicineOverlay'; // Adjust path as necessary

const PharmacyList = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const backend_uri = import.meta.env.VITE_URI;
  const [buyMedicineOpen, setBuyMedicineOpen] = useState(false);

  // Fetch pharmacies
  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const res = await axios.get(`${backend_uri}/pharmacy/get`);
        if (res.data && res.data.pharmacies) {
          setPharmacies(res.data.pharmacies);
        }
      } catch (error) {
        console.error('Error fetching pharmacies:', error);
      }
    };

    fetchPharmacies();
  }, [backend_uri]);

  // Fetch medicines for the overlay
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const res = await axios.get(`${backend_uri}/pharmacy/get-medicine`);
        if (res.data && Array.isArray(res.data.medicines)) {
          setMedicines(res.data.medicines);
        } else {
          setMedicines(res.data);
        }
      } catch (error) {
        console.error('Error fetching medicines:', error);
      }
    };

    fetchMedicines();
  }, [backend_uri]);

  const handleOpenBuyMedicine = () => {
    setBuyMedicineOpen(true);
  };

  const handleCloseBuyMedicine = () => {
    setBuyMedicineOpen(false);
  };

  return (
    <div>
      {/* Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Pharmacy List</Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          {pharmacies.map(pharmacy => (
            <Grid item xs={12} key={pharmacy._id}>
              <Card sx={{ display: 'flex', p: 2, m: 2, borderRadius: 2 }}>
                <CardMedia
                  component="img"
                  sx={{ width: 150, borderRadius: 1 }}
                  image={pharmacy.imageUrl || 'https://via.placeholder.com/150'}
                  alt={pharmacy.name}
                />
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

      {/* Floating Action Button for "Buy Medicine" */}
      <Fab
        variant="extended"
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
        onClick={handleOpenBuyMedicine}
      >
        <LocalPharmacyIcon sx={{ mr: 1 }} />
        Buy Medicine
      </Fab>

      {/* Buy Medicine Overlay */}
      <BuyMedicineOverlay
        open={buyMedicineOpen}
        onClose={handleCloseBuyMedicine}
        backendUri={backend_uri}
        medicines={medicines}
      />
    </div>
  );
};

export default PharmacyList;
