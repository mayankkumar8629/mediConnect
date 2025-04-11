import express from "express";
import { getAllInventoryItems,addnewItem } from "../controllers/inventoryController.js";
import { authenticateToken,authorizeRoles } from "../middleware/authMiddleware.js";

const router=express.Router();

router.get("/getAllInventory",authenticateToken,authorizeRoles("hospital-admin"),getAllInventoryItems);
router.post("/getAllInventory/new",authenticateToken,authorizeRoles("hospital-admin"),addnewItem);

export default router;