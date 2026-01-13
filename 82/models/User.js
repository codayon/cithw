import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import validator from "validator";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please tell us your username"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email address"],
    validate: [validator.isEmail, "That doesn't look like a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

const User = model("User", userSchema);

export default User;
