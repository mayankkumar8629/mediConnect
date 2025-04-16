import express from "express";
import dotenv from "dotenv";
dotenv.config({path:"../../.env"});

import connectDB from "../../config/db.js";
connectDB();


const app=express();
const PORT=4003;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import authRouteAdmin from "./routes/authRouteAdmin.js";
import hospitalRoute from "./routes/hospitalRoute.js";
import pharmacyRoute from "./routes/pharmacyRoute.js";

app.use("/admin",authRouteAdmin);
app.use("/api/hospital",hospitalRoute);
app.use("/api/pharmacy",pharmacyRoute)

app.listen(PORT,()=>{
    console.log(`Admin is listening on Port ${PORT}`);
})