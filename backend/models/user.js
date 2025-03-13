require("dotenv").config();
const mongoose = require("mongoose");
const Schema=mongoose.Schema;
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");



const userSchema = new mongoose.Schema({
    
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
userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports = mongoose.model('User', userSchema);
