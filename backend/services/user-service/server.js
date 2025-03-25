import express from "express";
import {configDotenv} from "dotenv";

import User from '../../models/user.js'
import mongoose from "../../config/db.js";
configDotenv({path:"../../.env"});

const app=express();

const PORT = process.env.USER_SERVICE_PORT ;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import userAuthRoutes from "./routes/authRoutes.js";



app.use("/user",userAuthRoutes);

app.listen(PORT,()=>{
    console.log(`User service running on port ${PORT}`);
})

