import mongoose from "mongoose";

const { Schema, model } = mongoose;

const hospitalSchema = new Schema({
    hospitalCode: {
        type: String,
        required: true,
        unique: true,
        match: [/^\d{6}$/, 'Hospital code must be a 6-digit number.'] // Validates 6-digit hospital code
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    specialties: {
        type: [String],
        required: true
    }, // Array of medical specialties
    ratings: {
        type: [Number],
        default: []
    }, // Stores user ratings
    imageUrl: {
        type: String,
        required: true
    }, // URL of the hospital's image
    doctors: [{
        type: Schema.Types.ObjectId,
        ref: "Doctors"
    }],
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review"
    }],
    patients:[
        {
            type:Schema.Types.ObjectId,
            ref:"Patient"
        }
    ],
    appointments:[
        {
            type:Schema.Types.ObjectId,
            ref:"Appointment"
        }
    ],
    inventory:[
        {
            type:Schema.Types.ObjectId,
            ref:"Inventory"
        }
    ],
    transactions:[
        {
            type:Schema.Types.ObjectId,
            ref:"Transaction"
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Export Hospital model
const Hospital =mongoose.model("Hospital", hospitalSchema);
export default Hospital;
