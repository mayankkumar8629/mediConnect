import mongoose from "../config/db.js";

const { Schema } = mongoose;

const hospitalAdminSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  contactNumber: {
    type: String,
    required: true,
    trim: true
  },
  hospitalId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  hospitalPassword: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ["user", "hospital-admin", "admin"],
    default: "hospital-admin"
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const HospitalAdmin = mongoose.model("HospitalAdmin", hospitalAdminSchema);
export default HospitalAdmin;