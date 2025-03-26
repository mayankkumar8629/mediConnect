import express from "express";
import { getAllHospitals,getHospitalById,addReviewToHospital } from "../controllers/hospitalUserController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

//routes for hospitals
router.get("/get",getAllHospitals);
router.get("/get/:id",getHospitalById);
router.post("/get/:id/reviews",authenticateToken,addReviewToHospital);

export default router;