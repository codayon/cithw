import express from "express";
import authController from "../../../controllers/auth.js";
const router = express.Router();

// This will be accessible at POST http://localhost:3000/api/v1/auth/signup
router.post("/signup", authController.signup);

export default router;
