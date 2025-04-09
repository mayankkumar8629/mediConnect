import HospitalAdmin from "../../../models/hospitalAdmin.js";
import Hospital from "../../../models/hospital.js";
import Doctors from "../../../models/doctors.js";
import Patient from "../../../models/patient.js";

export const demo = async(req,res)=>{
    return res.status(201).json({message:"req is comming"});
}

export const getAllPatient = async (req,res)=>{
   
    try{
        if(!req.user){
            res.status(401).json({message:"user not authenticated"});
        }
        
        const hospitalAdmin=await HospitalAdmin.findById(req.user.id);
        console.log(hospitalAdmin);
      
        const hospital=await Hospital.findOne({hospitalCode:hospitalAdmin.hospitalId}).populate('patients');
        console.log(hospital);
        if(!hospital){
            return res.status(404).json({message:"hospital not found"});
        }
        return res.status(200).json({patients:hospital.patients});
    }catch(error){
        console.log(error);
        res.status(500).json({message:error.message});
    }
}

export const addNewPatient = async(req,res)=>{
    try{
        console.log("hello");
        if(!req.user){
            res.status(401).json({messag:"User not authenticaed:Permission Denied"});
        }
        const hospitalAdmin=await HospitalAdmin.findById(req.user.id);
        const hospital = await Hospital.findOne({hospitalCode:hospitalAdmin.hospitalId});
        console.log(hospital);
        const {name,email,contactNumber,address,gender,bloodGroup,medicalHistory,doctors}=req.body;
        
        if(!name || !email || !contactNumber || !address){
            return res.status(400).json({message:"Please fill all required fields"});
        }
        

        const foundDoctors = await Doctors.find({
            name: { $in: doctors },
            hospitalID: { $in: [hospital._id] }  // Ensure the doctor's hospitalId matches the current hospital's _id
          });
        console.log(foundDoctors.length);
        
        if(foundDoctors.length!=doctors.length){
            
            return res.status(404).json({message:"One or more doctors not found "});
        }

        const doctorIds= foundDoctors.map(doc=>doc._id);
        console.log(doctorIds);

        //creating new patiend object
        const newPatient = new Patient({
            name,
            email,
            contactNumber,
            address,
            gender,
            bloodGroup,
            medicalHistory,
            doctors:doctorIds
        });
        await newPatient.save();
        hospital.patients.push(newPatient._id);
        await hospital.save();
        return res.status(201).json({mesage:"Patient created successfully",patiend:newPatient});
    }catch(error){
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

