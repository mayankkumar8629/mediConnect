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

//authentication route
app.use("/hospital",authRoute);
app.use("/api/patient",patientRoute);

app.listen(PORT,()=>{
    console.log(`HospitalAdmin is listening on Port ${PORT}`);
})