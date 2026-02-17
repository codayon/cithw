import express from "express";
import { createCategory, getCategory } from "../../../controllers/category.js";

const router = express.Router();

router.post("/create-category", createCategory);
router.get("/get-category/:categoryId", getCategory);

export default router;
