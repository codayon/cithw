import express from "express";
import { createProduct, getProduct } from "../../../controllers/product.js";

const router = express.Router();

router.post("/create-product", createProduct);
router.get("/get-product/:productId", getProduct);

export default router;
