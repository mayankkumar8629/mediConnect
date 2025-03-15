import express from "express";
import { getAllPharmacy,checkMedicineAvailability,buyMedicine,getPharmacy,getOrderHistory,getAllMedicine } from "../controllers/pharmacy.controller.js";

const router=express.Router();

router.get("/get",getAllPharmacy);
router.get("/get-medicine",getAllMedicine);
router.post("/check-medicine",checkMedicineAvailability);
router.post("/check-medicine/:pharmacyId/buy",buyMedicine);
router.get("/check-medicine/:id",getPharmacy);
router.get("/orders",getOrderHistory);

export default router;

