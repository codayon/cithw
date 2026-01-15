import express from "express";
const router = express.Router();

// This will be accessible at GET http://localhost:3000/api/v1/shop/products
router.get("/products", (req, res) => {
  res.send({ status: "success", type: "shop" });
});

export default router;
