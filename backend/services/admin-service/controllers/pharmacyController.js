import Pharmacy from "../../../models/pharmacy.js";

export const getAllPharmacy = async(req,res)=>{

    try{
        const pharmacy=await Pharmacy.find({});
        if(!pharmacy){
            return res.status(404).json({message:"Not found"});
        }
        return res.status(201).json({pharmacy});
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"error fetching pharmacies"});
    }
}

export const createNewPharmacy = async(req,res)=>{
    try{
        const {name,address,contactNumber,openingHours}=req.body;
        if(!name || !address || !contactNumber || !openingHours){
            return res.status(404).json({message:"Fields cannot be left empty"});
        }
        const existingPharmacy = await Pharmacy.findOne({contactNumber});
        if(existingPharmacy){
            return res.status(400).json({message:"Pharmacy already exists"});
        }
        const newPharmacy = new Pharmacy({
            name,
            address,
            contactNumber,
            openingHours
        });
        await newPharmacy.save();
        return res.status(201).json({newPharmacy});
    }catch(error){
        console.error(error);
        return res.status(500).json({messsage:"Error creating new pharmacy"});
    }
}