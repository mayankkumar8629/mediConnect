import express from "express";
import { getAllHospitals,getHospitalById,updateHospitalById,deleteHospitalById } from "../controllers/hospitalController.js";
import { authenticateToken,authorizeRoles } from "../middlewares/authmiddleware.js";


const router=express.Router();

router.get("/getAllHospitals",authenticateToken,authorizeRoles("admin"),getAllHospitals);
router.get("/getAllHospitals/:hospitalId",authenticateToken,authorizeRoles("admin"),getHospitalById);
router.put("/getAllHospitals/:hospitalId/update",authenticateToken,authorizeRoles("admin"),updateHospitalById);
router.delete("/getAllHospitals/:hospitalId/delete",authenticateToken,authorizeRoles("admin"),deleteHospitalById);

export default router;