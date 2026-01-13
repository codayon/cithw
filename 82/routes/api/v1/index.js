import express from "express";
import authRoutes from "./auth.js";
import shopRoutes from "./shop.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/shop", shopRoutes);

export default router;
