import mongoose from "mongoose";
import Pharmacy from  "../models/pharmacy.js";
import Medicine from "../models/medicine.js";
import Order from "../models/order.model.js";
import User from "../models/user.js";

//get all pharmacy 
export const getAllPharmacy = async (req,res)=>{
    try{
        const pharmacies= await Pharmacy.find({}).populate("medicines.medicine");
        res.status(200).json({message:"Pharmacy list fetched successfully",pharmacies});

    }catch(error){
        console.error("Error fetching pharmcies",error);
        res.status(500).json({message:"Error fetching pharmacies",error});
    }
}
//get all medicine data
export const getAllMedicine = async(req,res)=>{
  try {
    const medicines = await Medicine.find({});
    res.status(200).json({ message: "Medicines fetched successfully", medicines });
  } catch (error) {
    console.error("Error fetching medicines:", error);
    res.status(500).json({ message: "Error fetching medicines", error });
  }
}
//get pharmacy with the given medicien data
export const checkMedicineAvailability = async (req, res) => {
    try {
      const { medicines } = req.body; // User sends [{ name, quantity }]
  
      if (!medicines || medicines.length === 0) {
        return res.status(400).json({ message: "No medicines provided" });
      }
  
      // Step 1: Fetch medicine records based on names
      const medicineRecords = await Medicine.find({ name: { $in: medicines.map(med => med.name) } });
  
      if (medicineRecords.length !== medicines.length) {
        return res.status(404).json({ message: "One or more medicines not found in database" });
      }
  
      // Step 2: Extract pharmacy IDs from medicine records
      const pharmacySet = new Set(); // Store unique pharmacy IDs
  
      medicineRecords.forEach(med => {
        med.pharmacies.forEach(pharmacyId => pharmacySet.add(pharmacyId.toString()));
      });
  
      // Step 3: Fetch pharmacy details with populated medicines
      const availablePharmacies = await Pharmacy.find({ _id: { $in: [...pharmacySet] } }); // Automatically fill medicine details
  
      // Step 4: Validate stock availability for each pharmacy
      const validPharmacies = availablePharmacies.filter(pharmacy => {
        return medicines.every(({ name, quantity }) => {
          const medicineRecord = medicineRecords.find(med => med.name === name);
          const stockEntry = pharmacy.medicines.find(m => m.medicine._id.toString() === medicineRecord._id.toString());
          return stockEntry && stockEntry.stock >= quantity;
        });
      });
  
      if (validPharmacies.length === 0) {
        return res.status(404).json({ message: "No pharmacy has sufficient stock for all medicines" });
      }
  
      // **Final Response: Just send fully populated instances**
      res.status(200).json({ message: "Available pharmacies found", pharmacies: validPharmacies });
  
    } catch (error) {
      console.error("Error checking medicine availability:", error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
 };
 //buying the medicine

export const getPharmacy = async(req,res)=>{
  
  const {id}=req.params;
  console.log(id);
  try{
    const pharmacy=await Pharmacy.findById(id);
    res.status(201).json({message:"The pharmacy is :",pharmacy});
  }catch(error){
    res.status(500).json({message:"Error fetching the pharmacy",error});
  }
} 

export const buyMedicine = async(req,res)=>{
  
  const {pharmacyId}=req.params;
  console.log(pharmacyId);
  const userId = req.user ? req.user._id:null;
  if(!userId){
    return res.status(401).json({message:"User not authenticated"});
  }

  const {medicines} = req.body;  //name and quanity of the medicine
  

  if(!medicines || medicines.length==0){
    return res.status(400).json({message:"No medicines provided"});
  }

  //starting a new session for transaction
  const session=await mongoose.startSession();
  session.startTransaction();
  
  try{
    const medicineRecords = await Medicine.find({
      name: { $in: medicines.map(med => med.name) }
    }).session(session);

    if (medicineRecords.length !== medicines.length) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "One or more medicines not found in database" });
    }

    const pharmacy = await Pharmacy.findById(pharmacyId)
      .populate("medicines.medicine")
      .session(session);
    if (!pharmacy) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Pharmacy not found" });
    }

    let totalPrice = 0;
    const medicineUpdates = [];

    //checking the stock and calculating the pric 
    for (const { name, quantity } of medicines) {
      const medicine = medicineRecords.find(m => m.name === name);
      if (!medicine) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({ message: `Medicine ${name} not found` });
      }

      const stockEntry = pharmacy.medicines.find(m =>
        m.medicine._id.toString() === medicine._id.toString()
      );

      if (!stockEntry || stockEntry.stock < quantity) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ message: `Insufficient stock for ${name}` });
      }

      totalPrice += medicine.price * quantity;
      medicineUpdates.push({
        medicine: medicine._id,
        quantity,
      });
    }

    //creating a new order
    const newOrder = new Order({
      user: userId,
      pharmacy: pharmacyId,
      medicines: medicineUpdates,
      totalPrice,
    });
    await newOrder.save({ session });

    //updating the user and phamacy with the new order
    await User.findByIdAndUpdate(userId, { $push: { orders: newOrder._id } }, { session });
    await Pharmacy.findByIdAndUpdate(pharmacyId, { $push: { orders: newOrder._id } }, { session });

    //deducting the quantity from the stock
    for (const { medicine: medId, quantity } of medicineUpdates) {
      await Pharmacy.updateOne(
        { _id: pharmacyId, "medicines.medicine": medId },
        { $inc: { "medicines.$.stock": -quantity } },
        { session }
      );
    }

    await session.commitTransaction();
    session.endSession();
    
    res.status(201).json({message:"Order placed succesfully",order:newOrder});



  }catch(error){
    await session.abortTransaction();
    session.endSession();
    console.error("Error processing purchase:", error);
    res.status(500).json({ message: "Order processing failed", error });
  }

}
//order route
export const getOrderHistory =  async (req,res)=>{
  try{
    const userId=req.user._id;
    const orders = await Order.find({user:userId})
    .populate("pharmacy")
    .populate("medicines.medicine")
    .sort({createdAt:-1});

    res.status(200).json({message:"order retrived succesfully",orders});
  }catch(error){
    console.error("Error fetching orders",error);
    res.status(500).json({message:"error fetching orders",error});
  }
}