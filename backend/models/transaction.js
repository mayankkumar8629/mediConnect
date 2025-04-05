import mongoose from "../config/db.js";
const {Schema}=mongoose;

const transactionSchema = new Schema({
    invoiceNumber: {
        type    : String,
        required: true,
        unique  : true,
        trim    : true
    },

    patientName: {
        type    : Schema.Types.ObjectId,
        required: true
    },

    treatment: {
        type    : String,
        required: true,
        trim    : true
    },

    date: {
        type    : Date,
        required: true,
        default : Date.now
    },

    amount: {
        type    : Number,
        required: true
    },


    status: {
        type    : String,
        enum    : ['pending', 'completed', 'failed'],
        default : 'pending'
    },

    // Reference to the hospital where the transaction occurred
    hospital: {
        type    : Schema.Types.ObjectId,
        ref     : 'Hospital',
        required: true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Transaction = mongoose.model("transactionSchema",transactionSchema);
export default Transaction;