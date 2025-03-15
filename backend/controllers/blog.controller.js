import mongoose from "mongoose";
import User from "../models/user.js";
import Blog from "../models/blog.model.js";
import Comment from "../models/comment.model.js";

//adding new blog 
export const addNewBlog = async (req,res)=>{

    if(!req.user){
        return res.status(401).json({message:"User is not authenticated"});
    }
    
    const userId=req.user._id;
    const {title,body}=req.body;
    
    try{
        const newBlog=new Blog({
            title,
            body,
            author:userId
        });
        const savedBlog=await newBlog.save();
        res.status(201).json({message:"Blog saved sucessfully",savedBlog});

    }catch(error){
        console.error("Erro in saving blog",error);
        res.status(500).json({message:"Error saving blog"});
    }
}
//get all blog
export const getAllBlog = async (req,res)=>{

    try{
        const allBlog=await Blog.find({});
        res.status(201).json({messag:"Fetched all blogs",allBlog});
    }catch(error){
        console.error("Error fetching all blogs",error);
        res.status(500).json({message:"Erro fetching blogs"});
    }
}
//get comments
export const getAllComments = async(req,res)=>{
    const {blogId}=req.params;
    try{
        const blog=await Blog.findById(blogId).populate("comments");
        if(!blog){
            return res.status(404).json({mesage:"Blog not found"});
        }
        res.status(200).json({comments:blog.comments});
        
        
    }catch(error){
        console.error("Error fetching comments",error);
        res.status(500).json({message:"Error fetching comments"});
    }
       


    
}
//add new comment
export const addNewComment=async (req,res)=>{
    
    if(!req.user){
        return res.status(401).json({message:"User not authenticated"});
    }
    const userId=req.user._id;
    const {blogId}=req.params;
    const {body}=req.body;

    try{
        const newComment=new Comment({
            user:userId,
            body
        });
        const savedComment=await newComment.save();

        //finding the blog
        const blog=await Blog.findById(blogId);
        if(!blog){
            return res.status(404).json({message:"Blog not found"});
        }
        blog.comments.push(savedComment._id);
        await blog.save();
        res.status(201).json({
            message:"Comment saved successfully",
            comment:savedComment
        });


    }catch(error){
        console.error("Error adding comment",error);
        res.status(500).json({message:"Error adding comment"});
    }
}
