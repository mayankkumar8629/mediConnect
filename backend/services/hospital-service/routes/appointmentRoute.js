import express from "express";
import { addNewAppointment,getAllAppointment,actionOnAppointment } from "../controllers/appointmentController.js";
import { authenticateToken,authorizeRoles } from "../middleware/authMiddleware.js";

const router=express.Router();

router.post("/:id/newAppointment",authenticateToken,addNewAppointment);
router.get("/getAll",authenticateToken,authorizeRoles("hospital-admin"),getAllAppointment);
router.put("/getAll/:appointmentId/action",authenticateToken,authorizeRoles("hospital-admin"),actionOnAppointment);

export default router;