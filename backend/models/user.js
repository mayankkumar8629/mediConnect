import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
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
    orders:[
        {
            type:Schema.Types.ObjectId,
            ref:"Order"
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Add passport-local-mongoose plugin for authentication
userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

// Export User model
const User = mongoose.model("User", userSchema);
export default User;
