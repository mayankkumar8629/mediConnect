import express from "express";
import { configDotenv} from "dotenv";
import mongoose from "../../config/db.js";

configDotenv({path:"../../.env"});

const app=express();
const PORT=4002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import authRoute from "./routes/authRoute.js";
//authentication route
app.use("/hospital",authRoute);

app.listen(PORT,()=>{
    console.log(`HospitalAdmin is listening on Port ${PORT}`);
})