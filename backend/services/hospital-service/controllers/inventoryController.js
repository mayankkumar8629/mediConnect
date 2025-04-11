import Hospital from "../../../models/hospital";
import Inventory from "../../../models/inventory";
import HospitalAdmin from "../../../models/hospitalAdmin";

export const getAllInventoryItems = async(req,res)=>{

    try{
        const hospitalAdmin=await HospitalAdmin.findById(req.user.id);
        const hospital=await Hospital.findOne({hospitalCode:hospitalAdmin.hospitalId});
        if(!hospital){
            return res.status(404).json({message:"Hospital not found"});
        }
        const inventory = await Inventory.find({hospital:hospital._id});
        return res.status(201).json({inventory});
        
    }catch(error){
        console.error("Error in getting inventory items",error);
        return res.status(500).json({message:"error in finding items"});
    }
}

export const addnewItem = async(req,res)=>{
   
    try{
        const{
            name,
            itemCategory,
            inStockDetails:{
                quantity,
                reorderLevel
            }={}
           }=req.body;
    
           const hospitalAdmin=await HospitalAdmin.findById(req.user.id);
           const hospital = await Hospital.findOne({hospitalCode:hospitalAdmin.hospitalId});
    
           //inStockDetails validation
           if(!name || !itemCategory){
            return res.status(400).json({message:"Name and itemCateogy cannot be left blanked"});
           }

           if(typeof quantity!=='number' || typeof reorderLevel!=='number'){
            return res.status(400).json({
                message:"Quantity and reorderLevel must be numbers"
            });
           }

           if(quantity<0 || reorderLevel<0){
            return res.status(400).json({
                message:"Quanity and reorderLevel cannot be negative"
            });
           }
           let availability;
           if(quantity<=0){
            availability='out of stock';
           }else if(quantity<=reorderLevel){
            availability='low';
           }else{
            availability='available';
           }

           //creating the new item
           const newItem = new Inventory({
            name,
            itemCategory,
            inStockDetails:{
                quantity,
                reorderLevel
            },
            availability,
            hospital:hospital._id
           });

           return res.status(201).json({
            message:"Inventory item saved in the hospital",
            item:newItem
           });

    }catch(error){
        console.error("Error adding",error);
        return res.status(500).json({message:"Failed to add the new item"});
    }
       
}