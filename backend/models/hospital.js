const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  hospitalCode: {
    type: String,
    required: true,
    unique: true,
    // Validates that the code is exactly 6 digits
    match: [/^\d{6}$/, 'Hospital code must be a 6-digit number.']
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required:true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  specialties: {
    type: [String],
    required: true,
  }, // Array of medical specialties
  ratings: {
    type: [Number],
    default: [],
  }, // Stores user ratings
  imageUrl: {
    type: String,
    required: true,
  }, // URL of the hospital's image
  doctors:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Doctors"
  }],
  reviews:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Review"
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Hospital = mongoose.model("Hospital", hospitalSchema);

module.exports = Hospital;
