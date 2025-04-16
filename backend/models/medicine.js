import mongoose from "mongoose";
const { Schema, model } = mongoose;

const medicineSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    manufacturer:{
        type:String,
        trim:true
    },
    description:{
        type:String,
        trim:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    prescriptionRequired:{
        type:Boolean,
        default:false
    },
    pharmacies:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Pharmacy"
    }],
    createdAt:{
        type:Date,
        default:Date.now
    }
});

const Medicine=mongoose.model("Medicine",medicineSchema);
export default Medicine;