import mongoose from "../config/db.js";

const { Schema, model } = mongoose;

const reviewSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: "Hospital",
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Export Review model
const Review = model("Review", reviewSchema);
export default Review;
