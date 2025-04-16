import express from "express";
import { getAllPharmacy,createNewPharmacy } from "../controllers/pharmacyController.js";
import { authenticateToken,authorizeRoles } from "../middlewares/authmiddleware.js";

const router = express.Router();

router.get("/allPharmacy",authenticateToken,authorizeRoles("admin"),getAllPharmacy);
router.post("/newPharmacy",authenticateToken,authorizeRoles("admin"),createNewPharmacy);

export default router;