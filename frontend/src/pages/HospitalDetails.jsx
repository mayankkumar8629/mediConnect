import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import HospitalInfo from "../components/HospitalInfo";
import DoctorSlider from "../components/DoctorSlider";
import { Container, Typography } from "@mui/material";

const HospitalPage = () => {
  const { id } = useParams();
  const [hospital, setHospital] = useState(null);
  const backend_uri = import.meta.env.VITE_URI;

  useEffect(() => {
    axios
      .get(`${backend_uri}/hospital/get/${id}`)
      .then((response) => setHospital(response.data))
      .catch((error) => console.error("Error fetching hospital:", error));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this hospital?")) return;
    try {
      await axios.delete(`${backend_uri}/hospital/delete/${id}`);
      alert("Hospital deleted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error deleting hospital:", error);
      alert("Failed to delete hospital!");
    }
  };

  if (!hospital) {
    return <Typography variant="h5" align="center">Loading...</Typography>;
  }

  return (
    <Container>
      {/* Hospital Information */}
      <HospitalInfo hospital={hospital} handleDelete={handleDelete} />

      {/* Doctors Slider */}
      <DoctorSlider doctors={hospital.doctors} />
    </Container>
  );
};

export default HospitalPage;
