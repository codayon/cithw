import express from "express";
import authRoutes from "./auth.js";
import categoryRoutes from "./category.js";
import productRoutes from "./product.js";
import userRoutes from "./user.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/category", categoryRoutes);
router.use("/product", productRoutes);
router.use("/user", userRoutes);

export default router;
