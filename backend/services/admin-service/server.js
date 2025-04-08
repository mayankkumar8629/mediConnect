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

app.use("/admin",authRouteAdmin);

app.listen(PORT,()=>{
    console.log(`Admin is listening on Port ${PORT}`);
})