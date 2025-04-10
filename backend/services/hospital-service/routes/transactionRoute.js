import express from "express";
import { getAllTransaction,getTransactionById } from "../controllers/transactionController";
import { authenticateToken,authorizeRoles } from "../middleware/authMiddleware";

const router=express.Router();

router.get("/getAll",authenticateToken,authorizeRoles("hospital-admin"),getAllTransaction);
router.get("/getAll/:transactionId",authenticateToken,authorizeRoles("hospital-admin"),getTransactionById);

export default router;