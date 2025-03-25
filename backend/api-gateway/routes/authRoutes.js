import express from "express";
import jwt from "jsonwebtoken";
import axios from "axios";
import User from "../../models/user.js";
import Admin from "../../models/admin.js";
import HospitalAdmin from "../../models/hospitalAdmin.js";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
const router=express.Router();

router.get("/test", async(req,res)=>{
    // console.log("Mongoose connection state:", mongoose.connection.readyState);
    const user=await User.find({});
    res.json(user);
})

router.post("/login",async (req,res)=>{
    console.log("MONGO_URL:", process.env.MONGO_URL);

    
    try{
        const {email,password,role}=req.body;

        let user=null;
        console.log(email);
        if(role=="user"){
            console.log("req1");
            user = await User.findOne({email});
            console.log("req2");
        }else if(role=="hospital-admin"){
            user=await HospitalAdmin.findOne({email});
        }else if(role=="admin"){
            user = await Admin.findOne({email});
        }else{
            return res.status(400).json({message:"Invalid role provided"});
        }

        if(!user){
            return res.status(400).json({message:"Invalid credentials"});
        }
        //verify the password
        const hasshedPassword = await user.password;
        const isMatch = await bcrypt.compare(password, hasshedPassword);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }
        //generate a jwt token with user information 
        const token = jwt.sign(
            {id:user._id,email:user.email,role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        );
        
        res.json({message:"Login successful",token});

    }catch(error){
        console.error("Login error",error);
        res.status(500).json({message:error.message});
    }
});

//signup 
router.post("/signup", async (req,res)=>{
    console.log("req-api");
    try{
        const {role} = req.body;
        let serviceUrl;
        let endpoint = "/user/signup";

        if (role === "user") {
            serviceUrl = process.env.USER_SERVICE_URL;
            endpoint="/user/signup";
          } else if (role === "hospital-admin") {
            serviceUrl = process.env.HOSPITAL_SERVICE_URL;
            endpoint="/hospital/signup";
          } else if (role === "admin") {
            serviceUrl = process.env.ADMIN_SERVICE_URL;
            endpoint="/admin/signup";
          } else {
            return res.status(400).json({ message: "Invalid role provided" });
          }

          const response= await axios.post(`${serviceUrl}${endpoint}`,req.body);
          res.status(response.status).json(response.data);
    }catch(error){
        console.error("Signup Error",error.message);
        res.status(error.response?error.response.status:500)
            .json({message:error.message});
    }
});
export default router;