import HospitalAdmin from "../../../models/hospitalAdmin.js";
import Hospital from "../../../models/hospital.js";
import Appointment from "../../../models/appointment.js";
import User from "../../../models/user.js";
import Doctor from "../../../models/doctors.js";

export const addNewAppointment = async(req,res)=>{
    try{
        
        if(!req.user){
            return res.status(401).json({message:"Access denied"});
        }
        const {id}=req.params;
        console.log(req.params.id);
        
        const currentUser=await User.findById(req.user.id);
    
        const currentHospital=await Hospital.findById(id);
       
       
        
        if(!currentHospital){
            return res.status(400).json({messge:"Hospital not found"});
        }
        const {name,email,contactNumber,address,gender,bloodGroup,medicalHistory,type,reasonForAppointment}=req.body;
        console.log(req.body);

        if(!name || !email || !contactNumber || !address || !reasonForAppointment){
            return res.status(400).json({message:"Please fill all the details"});
        }
        const newAppointment=new Appointment({
            name,
            email,
            contactNumber,
            address,
            gender,
            bloodGroup,
            hospital:currentHospital._id,
            medicalHistory,
            type,
            reasonForAppointment,
            user:currentUser._id,
            status:"pending"
        });
        await newAppointment.save();
        currentHospital.appointments.push(newAppointment._id);
        await currentHospital.save();
        
        return res.status(201).json({message:"Appointment added succesfully",appointment:newAppointment});
    }catch(error){
        console.log(error.message);
        res.status(400).json({message:"Error booking appointment"});
    }
}

export const getAllAppointment = async(req,res)=>{
    try{
        if(!req.user){
            return res.status(401).json({messge:"Access Denied"});
        }
        const hospitalAdmin = await HospitalAdmin.findById(req.user.id);
        const currentHospital = await Hospital.findOne({hospitalCode:hospitalAdmin.hospitalId}).populate('appointments');
        if(!currentHospital){
            return res.status(400).json({message:"hospital not found"});
        }
        return res.status(200).json({appointments:currentHospital.appointments});
    }catch(error){
        console.log(error.message);
        return res.status(400).json({message:"error fetching appointments"});
    }

};

export const actionOnAppointment = async(req,res)=>{
    
    try{
       
        const {status,assignedDoctor,appointmentDate,rejectionReason}=req.body;
        const hospitalAdmin=await HospitalAdmin.findById(req.user.id);
        const currentHospital=await Hospital.findOne({hospitalCode:hospitalAdmin.hospitalId});
        console.log(currentHospital._id);
    

        const updatedDetails={status};
        if(status=="rejected"){
            updatedDetails.rejectionReason=rejectionReason;
            updatedDetails.assignedDoctor=null;
            updatedDetails.appointmentDate=null;
        }else if(status=="approved"){
            const doctor=await Doctor.findOne({
                name:assignedDoctor,
                hospitalID:currentHospital._id
            });
            console.log(doctor);
            if(!doctor){
                return res.status(400).json({message:"Doctor not found"});
            }
            updatedDetails.assignedDoctor=doctor._id;
            updatedDetails.appointmentDate=appointmentDate;
            updatedDetails.rejectionReason=null;
        }
        console.log(updatedDetails);
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            req.params.appointmentId,
            {$set:updatedDetails},
            {new:true}
        );
        console.log(updatedAppointment);
        return res.status(200).json({
            message:"Appointment action completed",
            updatedAppointment:updatedAppointment
        });
    }catch(error){
        console.log(error.message);
        return res.status(500).json({message:"Error updating the message"});
    }
}

export const getAppointmentById = async(req,res)=>{
    try{
        const appointment=await Appointment.findById(req.params.appointmentId);
        if(!appointment){
            return res.status(400).json({message:"Appointment not found"});
        }
        return res.status(200).json(appointment);
    }catch(error){
        console.log(error.message);
        return res.status(500).json({message:"Error finding the appointment"});
    }
}