import express from "express";
import {
  getAllHospitals,
  createHospital,
  getHospitalById,
  updateHospital,
  deleteHospital,
  addReviewToHospital
} from "../controllers/hospital.controller.js";

const router = express.Router();

// Routes for hospitals
router.get("/get", getAllHospitals);
router.post("/newhospital", createHospital);
router.get("/get/:id", getHospitalById);
router.put("/update/:id", updateHospital);
router.delete("/delete/:id", deleteHospital);
router.post("/get/:id/reviews", addReviewToHospital);

export default router;