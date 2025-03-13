const mongoose=require("mongoose");

const pharmacySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim: true
    },
    address:{
        type:String,
        required:true
    },
    contactNumber:{
        type:Number,
        required:true
    },
    openingHours:{
        type:String,
        requird:true
    },
    medicines:[{
        medicine:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Medicine"
        },
        stock:{
            type:Number,
            required:true,
            default:0 ///setting the default stock to zero
        }
    }],
    createdAt:{
        type:Date,
        default:Date.now
    }
});

const Pharmacy=mongoose.model("Pharmacy",pharmacySchema);
module.exports=Pharmacy;