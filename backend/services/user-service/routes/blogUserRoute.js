import express from "express";
import { addNewBlog,getAllBlog,addNewComment,getAllComments } from "../controllers/blogUserContoller.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router=express.Router();

router.post("/newBlog",authenticateToken,addNewBlog);
router.get("/allBlog",getAllBlog);
router.get("/allBlog/:blogId",getAllComments);
router.post("/allBlog/:blogId/newComment",addNewComment);

export default router;