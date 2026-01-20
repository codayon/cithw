import express from "express";
import authController from "../../../controllers/auth.js";

const router = express.Router();

router.post("/login", authController.logIn);
router.post("/resend-otp", authController.resendOtp);
router.post("/signup", authController.signUp);
router.post("/verify-otp", authController.verifyOtp);

export default router;
