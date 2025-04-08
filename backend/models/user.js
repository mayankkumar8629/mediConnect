import mongoose from "mongoose";

const { Schema,model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    // unique: true,
    // lowercase: true,
    // trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ["user", "hospital-admin", "admin"],
    default: "user"
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
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order"
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model("User", userSchema);
export default User;
