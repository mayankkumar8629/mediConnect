import mongoose from "../config/db.js";

const { Schema } = mongoose;

const adminSchema = new Schema({
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
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ["user", "hospital-admin", "admin"],
    default: "admin"
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Admin=mongoose.model("Admin",adminSchema);
export default Admin;