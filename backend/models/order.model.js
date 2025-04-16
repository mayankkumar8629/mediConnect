import mongoose from "mongoose";
const {Schema,model}=mongoose;

const orderSchema =new mongoose.Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    pharmacy:{
        type:Schema.Types.ObjectId,
        ref:"Pharmacy",
        required:true
    },
    medicines:[
        {
            medicine:{
                type:Schema.Types.ObjectId,
                ref:"Medicine",
                required:true
            },
            quantity:{
                type:Number,
                required:true
            }
        }
    ],
    totalPrice:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:["Pending","Completed","Cancelled"],
        default:"Pending",
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})
const Order=mongoose.model("Order",orderSchema);
export default Order;