import Admin from "../../../models/admin.js";
import bcrypt from "bcrypt";

export const adminSignup = async(req,res)=>{
    try{
        const {
            name,
            email,
            adminPasskey,
            password,
            role,
            city,
            mobileNumber
        }=req.body;
        const existingAdmin = await Admin.findOne({email});
        if(existingAdmin){
            return res.status(400).json({message:"Admin already exists",error});
        }
        if(adminPasskey!="Mayank"){
            return res.status(400).json({message:"Admin authorization restricted"});
        }
        const hashedPassword= await bcrypt.hash(password,10);

        //creating new admin
        const newAdmin =  new Admin({
            name,
            email,
            password:hashedPassword,
            role:role || "admin",
            city,
            mobileNumber
        })
        await newAdmin.save();
        res.status(201).json({
            message:"Admin regitered successfully",
            user:{
                id:newAdmin._id,
                name:newAdmin.name,
                email:newAdmin.email,
                city:newAdmin.city,
                mobileNumber:newAdmin.city,
                role:newAdmin.role
            }
        })
    }catch(error){
        console.error("Signp error",error);
        res.status(500).json({messae:"Error registering admin",error:error.message});
    }
}