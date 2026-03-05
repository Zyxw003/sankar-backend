import express from "express";
import { loginuser, registerUser } from "../usercontroller.js";
const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginuser);
export default router;
