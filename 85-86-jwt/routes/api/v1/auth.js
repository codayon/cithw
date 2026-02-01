import express from "express";
import {
  logIn,
  logOut,
  resendOtp,
  signUp,
  verifyOtp,
} from "../../../controllers/auth.js";

const router = express.Router();

router.post("/login", logIn);
router.post("/resend-otp", resendOtp);
router.post("/signup", signUp);
router.post("/verify-otp", verifyOtp);

export default router;
