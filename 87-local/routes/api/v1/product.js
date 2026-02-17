import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from "../../../controllers/product.js";
import upload from "../../../middlewares/upload.js";

const router = express.Router();

router.post("/create-product", upload.array("images", 5), createProduct);
router.get("/get-product/:productId", getProduct);
router.delete("/delete-product/:productId", deleteProduct);
router.patch("/update-product/:productId", updateProduct);

export default router;
