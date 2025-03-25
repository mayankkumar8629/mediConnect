import express from "express";
import {signupHospitalAdmin} from "../controllers/authControllerHospital.js";

const router=express.Router();

router.post("/signup",signupHospitalAdmin);

export default router;