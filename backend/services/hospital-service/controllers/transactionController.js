import HospitalAdmin from "../../../models/hospitalAdmin.js";
import Hospital from "../../../models/hospital.js";
import Doctors from "../../../models/doctors.js";
import Patient from "../../../models/patient.js";
import Transaction from "../../../models/transaction.js";

export const getTransactionById = async(req,res)=>{
    try{
        const transaction=await Transaction.findById(req.params.transactionId).populate('hospital').populate('user');
        if(!transaction){
            return res.status(404).json({message:"Transaction not found"});
        }
        return res.status(200).json({transaction});
    }catch(error){
        console.error("error retrieving message",error);
        return  res.status(500).json({message:"Error retrieving transaction"});
    }
}

//get all transaction for a respective hospital
export const getAllTransaction = async(req,res)=>{

    try{
        const hospitalAdmin=await HospitalAdmin.findById(req.user.id);
        const currentHospital=await Hospital.findOne({hospitalCode:hospitalAdmin.hospitalId}).populate('transactions');
        if(!currentHospital){
            return res.status(404).json({message:"Hospital not found"});
        } 
        return res.status(200).json({transactions:currentHospital.transactions});

    }catch(error){
        console.error("error in retrieving the transaction",error);
        return res.status(500).json({message:"Error in retrieving the transaction"});
    }
}


///creating a new transaction
