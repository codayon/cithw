import express from "express";
import { createProduct } from "../../../controllers/product.js";

const router = express.Router();

router.get("/create-products", createProduct);

export default router;
