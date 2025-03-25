import HospitalAdmin from "../../../models/hospitalAdmin.js";
import Hospital from "../../../models/hospital.js";
import bcrypt from "bcrypt";
export const signupHospitalAdmin = async(req,res)=>{
    console.log(req.body);
    try{
        const {
            name,
            email,
            address,
            contactNumber,
            hospitalId,
            hospitalPassword,
            password,
            role,
            city
        }=req.body

        const hospitalRecord=await Hospital.findOne({hospitalCode:hospitalId});

        if(!hospitalRecord){
            return res.status(400).json({message:"Hospital not found"});
        }
        if(hospitalId!=hospitalPassword){
            return res.status(400).json({message:"Hospital Password is incorrect"});
        }
        const existingAdmin = await HospitalAdmin.findOne({email});

        if(existingAdmin){
            return res.status(400).json({message:"User already exists"});
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newAdmin= new HospitalAdmin({
            name,
            email,
            address,
            contactNumber,
            hospitalId,
            hospitalPassword,
            password:hashedPassword,
            role:role|| "hospital-admin",
            city

        })
        await newAdmin.save();
        res.status(201).json({
            message:"Registration successfull",
            admin:{
                id:newAdmin._id,
                name:newAdmin.name,
                email:newAdmin.email,
                hospitalId:newAdmin.hospitalId,
                city:newAdmin.city

            },
        });
    }catch(error){
        console.error("Hospital admin signup error: ",error);
        res.status(500).json({message:"Error registering hospital admin",error:error.message});
    }
};