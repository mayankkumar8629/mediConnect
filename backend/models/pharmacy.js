import mongoose from "../config/db.js";

const { Schema, model } = mongoose;

const pharmacySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true
    },
    contactNumber: {
        type: Number,
        required: true
    },
    openingHours: {
        type: String,
        required: true
    },
    medicines: [{
        medicine: {
            type: Schema.Types.ObjectId,
            ref: "Medicine"
        },
        stock: {
            type: Number,
            required: true,
            default: 0 // Setting the default stock to zero
        }
    }],
    orders:[
        {
            type:Schema.Types.ObjectId,
            ref:"Order"
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Export Pharmacy model
const Pharmacy = model("Pharmacy", pharmacySchema);
export default Pharmacy;
