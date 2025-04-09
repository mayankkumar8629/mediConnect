import mongoose from "mongoose";
const {Schema,model}=mongoose;

const appointmentSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    contactNumber:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        enum:['male','female','others']
    },
    bloodGroup:{
        type:String,
        enum    : ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        default:'O+'
    },
    hospital:{
        type:Schema.Types.ObjectId,
        ref:"Hospital"
    },
    medicalHistory:{
        type:String
    },
    type:{                  //type of doctor
        type:String,
    },
    reasonForAppointment:{
        type:String,
        required:true,
        trim:true
    },
    status:{
        type:String,
        enum:['pending','approved','rejected'],
        default:'pending'
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    assignedDoctor:{
        type:Schema.Types.ObjectId,
        ref:"Doctors"
    },
    appointmentDate:{
        type:Date
    },
    rejectionReason:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    }


})
const Appointment = mongoose.model("Appointment",appointmentSchema);
export default Appointment;

