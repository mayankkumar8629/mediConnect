import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  IconButton,
  Button,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

const BuyMedicineOverlay = ({ open, onClose, backendUri, medicines }) => {
  // State for the dynamic order form
  const [orderItems, setOrderItems] = useState([{ medicine: "", quantity: 1 }]);
  // State for availability result (pharmacies that can fulfill the order)
  const [availabilityResult, setAvailabilityResult] = useState(null);
  // State for final order confirmation details
  const [finalOrderResult, setFinalOrderResult] = useState(null);

  // Update a row when the user changes medicine or quantity
  const handleRowChange = (index, field, value) => {
    const newOrderItems = [...orderItems];
    newOrderItems[index][field] = value;
    setOrderItems(newOrderItems);
  };

  // Add a new row for another medicine entry
  const handleAddRow = () => {
    setOrderItems([...orderItems, { medicine: "", quantity: 1 }]);
  };

  // First step: Check availability by sending the order payload
  const handleCheckAvailability = async () => {
    const payload = {
      medicines: orderItems
        .filter((item) => item.medicine)
        .map((item) => ({
          name: item.medicine, // assuming the selected value is the medicine name
          quantity: item.quantity,
        })),
    };
    try {
      const response = await axios.post(
        `${backendUri}/pharmacy/check-medicine`,
        payload,
        { withCredentials: true }
      );
      // Expected response: { message, pharmacies: [...] }
      setAvailabilityResult(response.data);
    } catch (error) {
      console.error("Error checking availability:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
      }
    }
  };

  // Second step: Finalize order with the selected pharmacy
  const handleBuy = async (pharmacy) => {
    const payload = {
      medicines: orderItems
        .filter((item) => item.medicine)
        .map((item) => ({
          name: item.medicine,
          quantity: item.quantity,
        })),
    };
    try {
      const response = await axios.post(
        `${backendUri}/pharmacy/check-medicine/${pharmacy._id}/buy`,
        payload,
        { withCredentials: true }
      );
      // Expected response: { message, order: { ... } }
      setFinalOrderResult(response.data);
    } catch (error) {
      console.error("Error placing final order:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
      }
    }
  };

  // Reset the overlay state when closing
  const handleClose = () => {
    setOrderItems([{ medicine: "", quantity: 1 }]);
    setAvailabilityResult(null);
    setFinalOrderResult(null);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: { width: "50%", margin: "auto" } }}
      BackdropProps={{ style: { backdropFilter: "blur(5px)" } }}
    >
      <DialogTitle>
        {finalOrderResult
          ? "Order Confirmation"
          : availabilityResult
          ? "Select Pharmacy"
          : "Buy Medicine"}
      </DialogTitle>
      <DialogContent>
        {finalOrderResult ? (
          // Display order confirmation details
          <Box>
            <Typography variant="h6" gutterBottom>
              {finalOrderResult.message}
            </Typography>
            <Typography variant="body1">
              Order ID: {finalOrderResult.order._id}
            </Typography>
            <Typography variant="body1">
              Total Price: ${finalOrderResult.order.totalPrice}
            </Typography>
          </Box>
        ) : availabilityResult ? (
          // Display list of available pharmacies with Buy buttons
          <Box>
            <Typography variant="h6" gutterBottom>
              {availabilityResult.message}
            </Typography>
            {availabilityResult.pharmacies && availabilityResult.pharmacies.length > 0 ? (
              availabilityResult.pharmacies.map((pharmacy) => (
                <Box
                  key={pharmacy._id}
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: 1,
                    p: 2,
                    my: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <Typography variant="h6">{pharmacy.name}</Typography>
                  <Typography variant="body1">{pharmacy.address}</Typography>
                  <Typography variant="body2">
                    Opening Hours: {pharmacy.openingHours}
                  </Typography>
                  <Typography variant="body2">
                    Contact: {pharmacy.contactNumber}
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleBuy(pharmacy)}
                  >
                    Buy
                  </Button>
                </Box>
              ))
            ) : (
              <Typography variant="body1">
                No pharmacy has sufficient stock for all medicines.
              </Typography>
            )}
          </Box>
        ) : (
          // Display the dynamic order form
          <>
            {orderItems.map((item, index) => (
              <Box key={index} sx={{ display: "flex", gap: 2, alignItems: "center", my: 1 }}>
                <FormControl fullWidth>
                  <InputLabel id={`medicine-select-label-${index}`}>Medicine</InputLabel>
                  <Select
                    labelId={`medicine-select-label-${index}`}
                    value={item.medicine}
                    label="Medicine"
                    onChange={(e) => handleRowChange(index, "medicine", e.target.value)}
                  >
                    {medicines.map((medicine) => (
                      <MenuItem key={medicine._id || medicine.id} value={medicine.name}>
                        {medicine.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  label="Quantity"
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleRowChange(index, "quantity", Number(e.target.value))}
                  sx={{ width: 100 }}
                  inputProps={{ min: 1 }}
                />
              </Box>
            ))}
            <IconButton color="primary" onClick={handleAddRow}>
              <AddIcon />
            </IconButton>
          </>
        )}
      </DialogContent>
      <DialogActions>
        {finalOrderResult ? (
          <Button onClick={handleClose} variant="contained" color="primary">
            Close
          </Button>
        ) : availabilityResult ? (
          <Button onClick={handleClose} variant="contained" color="primary">
            Cancel
          </Button>
        ) : (
          <Button onClick={handleCheckAvailability} variant="contained" color="primary">
            Submit Order
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default BuyMedicineOverlay;
