import User from "../../../models/user.js";
import bcrypt from "bcrypt";

export const signup = async(req,res)=>{
    try{
        const {name,email,password,role,city,mobileNumber}=req.body;

        //check if a user exists with the same email and password
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        const hasshedPassword = await bcrypt.hash(password,10);

        //creating newuser
        const newUser = new User({
            name,
            email,
            password:hasshedPassword,
            role:role || "user",
            city,
            mobileNumber

        });
        await newUser.save();
        res.status(201).json({
            message:"User registered successfully",
            user:{
                id:newUser._id,
                name:newUser.name,
                email:newUser.email,
                city:newUser.city,
                mobileNumber:newUser.mobileNumber,
                role:newUser.role,
                createdAt:newUser.createAt
            }
        });
    }catch(error){
        console.error("Signp error",error);
        res.status(500).json({messae:"Error registering user",error:error.message});
    }
}    