import express from "express";
import { addNewAppointment,getAllAppointment,actionOnAppointment,getAppointmentById } from "../controllers/appointmentController.js";
import { authenticateToken,authorizeRoles } from "../middleware/authMiddleware.js";

const router=express.Router();

router.post("/:id/newAppointment",authenticateToken,addNewAppointment);
router.get("/getAll",authenticateToken,authorizeRoles("hospital-admin"),getAllAppointment);
router.put("/getAll/:appointmentId/action",authenticateToken,authorizeRoles("hospital-admin"),actionOnAppointment);
router.get("/getAll/:appointmentId",authenticateToken,authorizeRoles("hospital-admin",getAppointmentById));

export default router;