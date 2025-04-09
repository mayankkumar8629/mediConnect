import express from "express";
import { addNewAppointment,getAllAppointment } from "../controllers/appointmentController.js";
import { authenticateToken,authorizeRoles } from "../middleware/authMiddleware.js";

const router=express.Router();

router.post("/:id/newAppointment",authenticateToken,addNewAppointment);
router.get("/getAll",authenticateToken,authorizeRoles("hospital-admin"),getAllAppointment);

export default router;