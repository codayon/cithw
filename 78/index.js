import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { User } from "./userSchema.js";

const app = express();
const port = 3000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect", err));

app.use(express.json());

app.post("/", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Something went wrong on our end" });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}/`);
});
