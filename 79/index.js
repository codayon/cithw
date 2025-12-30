import "dotenv/config";
import bcrypt from "bcrypt";
import express from "express";
import jsonwebtoken from "jsonwebtoken";
import mongoose from "mongoose";
import nextFn from "./nextFn.js";
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
    const token = jsonwebtoken.sign({ email: email }, process.env.JWT_SECRET);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      token,
    });
    await newUser.save();
    res.status(201).json({ message: "Your account has been created" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Something went wrong on our end" });
  }
});

app.get("/", nextFn, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
