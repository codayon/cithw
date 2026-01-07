import express from "express";
const router = express.Router();

// This will be accessible at POST /api/v1/auth/signup
router.post("/signup", (req, res) => {
  res.send({ status: "success", type: "auth" });
});

export default router;
