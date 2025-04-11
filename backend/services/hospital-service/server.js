import express from "express";
import dotenv from "dotenv";
dotenv.config({path:"../../.env"});

import connectDB from "../../config/db.js";
connectDB();

const app=express();
const PORT=4002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import authRoute from "./routes/authRoute.js";
import patientRoute from "./routes/patientRoute.js";
import appointmentRoute from "./routes/appointmentRoute.js";
import transactionRoute from "./routes/transactionRoute.js";
import inventoryRoute from "./routes/inventoryRoute.js";

//authentication route
app.use("/hospital",authRoute);
app.use("/api/patient",patientRoute);
app.use("/api/appointment",appointmentRoute);
app.use("/api/transaction",transactionRoute);
app.use("/api/invetory",inventoryRoute);


app.listen(PORT,()=>{
    console.log(`HospitalAdmin is listening on Port ${PORT}`);
})