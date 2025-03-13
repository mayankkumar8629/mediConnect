import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid, Container } from "@mui/material";
import HospitalCard from "../components/HospitalCard";

const Home = () => {
  const [hospitals, setHospitals] = useState([]);
  const backend_uri = import.meta.env.VITE_URI;
  useEffect(() => {
    axios
      .get(`${backend_uri}/hospitals`) // Ensure this API is running
      .then((response) => setHospitals(response.data))
      .catch((error) => console.error("Error fetching hospitals:", error));
  }, []);

  return (
    <Container maxWidth="lg" sx={{ px: 6, py: 3 }}>
      <Grid container spacing={3} justifyContent="flex-start"> {/* ✅ Aligns last row to left */}
        {hospitals.map((hospital) => (
          <Grid item xs={12} sm={6} md={4} key={hospital._id}>
            <HospitalCard hospital={hospital} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
