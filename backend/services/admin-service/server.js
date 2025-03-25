import express from "express";
import {configDotenv} from "dotenv";
import mongoose from "../../config/db.js";


configDotenv({path:"../../.env"});

const app=express();
const PORT=4003;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import authRouteAdmin from "./routes/authRouteAdmin.js";

app.use("/admin",authRouteAdmin);

app.listen(PORT,()=>{
    console.log(`Admin is listening on Port ${PORT}`);
})