import mongoose from "../config/db.js";
const {Schema}=mongoose;

const patientSchema=new Schema({
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
    imageUrl:{
        type:String,
    },
    medicalHistory:{
        pastIllness:[
            {
                type:String,
                trim:true
            }
        ],
        surgeries:[
            {
                type:String,
                trim:true
            }
        ],
        chronicConditions:[
            {
                type:String,
                trim:true
            }
        ]

    },
    doctors:[
        {
            type:Schema.Types.ObjectId,
            ref:"Doctors"
        }
    ],
    appointments:[
        {
            type:Schema.Types.ObjectId,
            ref:"Appointment"
        }
    ],
    transactions:[
        {
            type:Schema.Types.ObjectId,
            ref:"Transaction"
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Patient=model("Patient",patientSchema);
export default Patient;