import mongoose from "mongoose";

const { Schema,model } = mongoose;

const inventorySchema= new Schema({
    name: { 
        type     : String, 
        required : true, 
        trim     : true 
    },

    itemCategory: { 
        type     : String, 
        required : true, 
        trim     : true 
    },

    
    availability: {
        type     : String,
        enum     : ['low', 'available', 'out of stock'],
        required : true
    },

    inStockDetails: {
        // Current quantity in stock
        quantity: { 
            type     : Number, 
            required : true 
        },
        // Quantity threshold to trigger a reorder
        reorderLevel: { 
            type     : Number, 
            required : true 
        }
    },
    hospital:{
        type:Schema.Types.ObjectId,
        ref:"Hospital"
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Inventory=mongoose.model("Inventory",inventorySchema);
export default Inventory;