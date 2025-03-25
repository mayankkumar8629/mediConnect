import express from "express";
import { adminSignup } from "../controllers/authControllerAdmin.js";

const router=express.Router();

router.post("/signup",adminSignup);

export default router;