import mongoose from "mongoose";
const {Schema,model}=mongoose;

//comment schema
const commentSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    body:{
        type:String,
        required:true
    },
    likes:{
        type:Number
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
const Comment=model("Comment",commentSchema);
export default Comment;