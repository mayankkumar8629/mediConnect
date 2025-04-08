import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config({path:"../.env"});
import connectDB from "../config/db.js";

connectDB();

const app=express();
const PORT=process.env.PORT || 3000;


app.use(
    cors({
      origin: [
        "http://localhost:5173",
        "https://hospital-front-qsze.onrender.com"
      ],
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    })
);
app.use(express.json());
app.use(express.urlencoded({extended:true}));



//importing the routes
import authRoutes from "./routes/authRoutes.js";
import proxyRoutes from "./routes/proxyRoutes.js";

//connection with the database



app.use("/api",authRoutes);
app.use("/api",proxyRoutes);

app.listen(PORT, ()=>
    console.log(`API Gateway listening on port ${PORT}`)
);