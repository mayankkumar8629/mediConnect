import express from "express";
import { getAllPharmacy,
    checkMedicineAvailability,
    buyMedicine,
    getOrderHistory,
    getAllMedicine
 } from "../controllers/pharmacyUserController.js";

import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/get",getAllPharmacy);
router.get("/get-medicine",getAllMedicine);
router.post("/check-medicine",checkMedicineAvailability);
router.post("/check-medicine/:pharmacyId/buy",authenticateToken,buyMedicine);
router.get("/orders",authenticateToken,getOrderHistory);

export default router;