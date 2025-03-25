import express from "express";
import { addNewBlog,getAllBlog,addNewComment,getAllComments } from "../controllers/blog.controller.js";

const router=express.Router();

router.post("/newBlog",addNewBlog);
router.get("/allBlog",getAllBlog);
router.get("/allBlog/:blogId",getAllComments);
router.post("/allBlog/:blogId/newComment",addNewComment);

export default router;