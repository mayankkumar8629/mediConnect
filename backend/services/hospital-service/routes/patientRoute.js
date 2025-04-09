import express from "express";
import { getAllPatient,addNewPatient,demo } from "../controllers/patientController.js";
import { authenticateToken,authorizeRoles } from "../../hospital-service/middleware/authMiddleware.js";

const router =express.Router();

router.get("/getAllPatient",authenticateToken,authorizeRoles("hospital-admin"),getAllPatient);
router.post("/newPatient",authenticateToken,authorizeRoles("hospital-admin"),addNewPatient);
router.get("/test",
    authenticateToken,
    authorizeRoles("hospital-admin"),
    demo
)

export default router;