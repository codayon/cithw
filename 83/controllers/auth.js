import sendOtpEmail from "../utils/email.js";
import User from "../models/User.js";
import { randomInt } from "node:crypto";

const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const otp = randomInt(100000, 999999).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000;

    const newUser = await User.create({
      username,
      email,
      password,
      otp,
      otpExpires,
    });

    await sendOtpEmail(newUser.email, newUser.otp, newUser.username);

    res.status(201).json({
      status: "success",
      message: "OTP sent to email. Please verify your account.",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({
      email,
      otp,
    });

    if (!user) {
      return res.status(400).json({ status: "fail", message: "Invalid OTP" });
    }

    if (Date.now() > user.otpExpires) {
      return res.status(400).json({ status: "OTP expired" });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save({ validateBeforeSave: false });

    res
      .status(200)
      .json({ status: "success", message: "Email verified successfully" });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
};

export default { signUp, verifyOtp };
