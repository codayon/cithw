import express from "express";
import authController from "../../../controllers/auth.js";
const router = express.Router();

router.post("/signup", authController.signUp);
router.post("/verify", authController.verifyOtp);

export default router;
