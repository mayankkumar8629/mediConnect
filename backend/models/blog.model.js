import mongoose from "mongoose";
const {Schema,model}=mongoose;

//blog schema
const blogSchema=new Schema(
    {
        title:{
            type:String,
            required:true
        },
        body:{
            type:String,
            required:true
        },
        author:{
            type:Schema.Types.ObjectId,
            ref:"User"
        },
        likes:{
            type:Number,
            default:0
        },
        comments:[
            {
                type:Schema.Types.ObjectId,
                ref:"Comment"
            }
        ],
        createdAt:{
            type:Date,
            default:Date.now
        }
    }
)

const Blog=model("Blog",blogSchema);
export default Blog;
