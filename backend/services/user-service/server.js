import express from "express";
import dotenv from "dotenv";
dotenv.config({path:"../../.env"});

import connectDB from "../../config/db.js";
connectDB();

const app=express();

const PORT = process.env.USER_SERVICE_PORT ;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import userAuthRoutes from "./routes/authRoutes.js";
import blogUserRoute from "./routes/blogUserRoute.js";
import hospitalUserRoute from "./routes/hospitalUserRoute.js";
import pharmacyUserRoute from "./routes/pharmacyUserRoute.js";





app.use("/user",userAuthRoutes);
app.use("/api/blog",blogUserRoute);
app.use("/api/hospital",hospitalUserRoute);
app.use("/api/pharmacy",pharmacyUserRoute);

app.listen(PORT,()=>{
    console.log(`User service running on port ${PORT}`);
})

