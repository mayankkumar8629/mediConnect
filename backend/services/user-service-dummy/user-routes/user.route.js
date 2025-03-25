import express from "express";
import { signup, login, logout, getUserDetails } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/userDetails",getUserDetails);

export default router;
