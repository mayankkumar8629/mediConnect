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
import blogUserRoute from "./routes/blogUserRoute.js";
import hospitalUserRoute from "./routes/hospitalUserRoute.js";



app.use("/user",userAuthRoutes);
app.use("/api/blog",blogUserRoute);
app.use("/api/hospital",hospitalUserRoute);

app.listen(PORT,()=>{
    console.log(`User service running on port ${PORT}`);
})

