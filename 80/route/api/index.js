import express from "express";
import authRoute from "./auth.js";
import productRoute from "./shop.js";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/shop", productRoute);

export default router;
