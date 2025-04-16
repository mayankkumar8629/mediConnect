import Hospital from "../../../models/hospital.js";
import Doctors from "../../../models/doctors.js";
import Inventory from "../../../models/inventory.js";
import Appointment from "../../../models/appointment.js";
import Patient from "../../../models/patient.js";
import Transaction from "../../../models/transaction.js";


export const getAllHospitals = async(req,res)=>{
    
    try{
        const hospital= await Hospital.find({});
        if(!hospital){
            return res.status(400).json({message:"Data not found for the hospitals"});
        }
        return res.status(201).json({message:"Date fetched successfully",hospital});
    }catch(error){
        console.error("Error fetching data",error);
        res.status(500).json({message:"Error fetching data"});
    }
}

export const createNewHospital = async(req,res)=>{

    try{
        console.log(req.body);
        const {hospitalCode,name,address,description,contactNumber,capacity,specialties,imageUrl}=req.body;

        console.log("Hii");
        if(!hospitalCode || !name || !address|| !contactNumber || !capacity || !specialties ){
            return res.status(404).json({message:"Fields cannot be left blank"});
        }
        console.log("hss");
        const existingHospital = await Hospital.findOne({hospitalCode:hospitalCode});
        if(existingHospital){
            return res.status(400).json({messsage:"Hospital already exists with the given code"});
        }
        console.log("hospital");
        const newHospital = new Hospital({
            hospitalCode,
            name,
            address,
            description,
            contactNumber,
            capacity,
            specialties,
            imageUrl
        
        });
        await newHospital.save();
        return res.status(201).json({
            message:"hospital created successfully",
            newHospital
        });
    }catch(error){
        console.error("Error creating new hospital",error);
        return res.status(500).json({message:"Error creating new hospital",error});
    }
}

export const getHospitalById = async (req, res) => {
    try {
        console.log("reqComming");
      const { hospitalId } = req.params;
      const hospital = await Hospital.findById(hospitalId)
        .populate("doctors")
        .populate("patients")
        .populate("appointments")
        .populate("inventory")
        .populate("transactions");
        console.log(hospital);
  
      if (!hospital) return res.status(404).json({ message: "Hospital not found" });
  
      res.status(200).json(hospital);
    } catch (error) {
      res.status(500).json({ message: "Error fetching hospital", error });
    }
};

export const updateHospitalById = async(req,res)=>{

    try{
        
        const {hospitalId}=req.params;
        
        const updateData=req.body;
        console.log(updateData);
         
        //validation
        if(!updateData || Object.keys(updateData).length===0){
            return res.status(400).json({
                message:"No update data provided"
            })
        }

        const requiredFields = ['name','address','contactNumber'];
        const missingFields = requiredFields.filter(field => {
            const value =updateData[field];
            return value === undefined || value === null || value.trim() === '';
        });

        if(missingFields.length > 0){
            return res.status(400).json({
                message:"Missing required fields",
                missingFields
            });
        }

        const sanitizedData = Object.keys(updateData).reduce((acc,key)=>{
            //trimming whitespaces from string fields
            if(typeof updateData[key]==='string'){
                acc[key]=updateData[key].trim();
            }else if(updateData[key]!==undefined && updateData[key]!==null){
                acc[key]=updateData[key];
            }
            return acc;
        },{});

        const updateHospital = await Hospital.findByIdAndUpdate(
            hospitalId,
            sanitizedData,
            {
                new :true,
                runValidators:true,
                context:'query'
            }
        );

        if(!updateHospital){
            return res.status(404).json({
                message:"hospital not found"
            })
        };

        return res.status(200).json({
            hospital:updateHospital
        })

        

    }catch(error){
        console.error("error updating hosptial",error);
        return res.status(500).json({message:"Error in hospital updation"});
    }
}

export const deleteHospitalById = async(req,res)=>{

    try{
        const {hospitalId}=req.params;
        if(!mongoose.Types.ObjectId.isValid(hospitalId)){
            return res.status(400).json({
                message:"hospitalId is incorrect"
            })
        };
        const hospital=await Hospital.findById(hospitalId);
        if(!hospital){
            return res.status(400).json({
                message:"Hospital does not exists"
            })
        }
        const deletedHospital = await Hospital.findByIdAndDelete(hospitalId);
        return res.status(201).json({
            message:"hospital deleted successfully",
            deletedHospital
        })
    }catch(error){
        console.error("Error in deleting hospital",error);
        return res.status(500).json({
            message:"Error in deleting the hospital"
        });
    }
}