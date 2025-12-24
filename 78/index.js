import "dotenv/config";
import bcrypt from "bcrypt";
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
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "Your account has been created" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Something went wrong on our end" });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}/`);
});
