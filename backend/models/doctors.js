import mongoose from "../config/db.js";

const { Schema, model } = mongoose;

const doctorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    contactNumber: {
        type: Number,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    availableTimings: {
        type: String,
        required: true
    },
    hospitalID: [{
        type: Schema.Types.ObjectId,
        ref: "Hospital"
    }]
});

// Export Doctor model
const Doctors = model("Doctors", doctorSchema);
export default Doctors;