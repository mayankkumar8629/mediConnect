const mongoose=require("mongoose");

const doctorSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    specialization:{
        type:String,
        required:true
    },
    contactNumber:{
        type:Number,
        required:true
    },
    experience:{
        type:Number,
        required:true
    },
    availableTimings:{
        type:String,
        required:true
    },
    hospitalID:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Hospital"
        
    }]
});
const Doctors=mongoose.model("Doctors",doctorSchema);
module.exports=Doctors;