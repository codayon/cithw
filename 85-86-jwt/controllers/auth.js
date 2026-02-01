import bcrypt from "bcryptjs";
import generateOtp from "../utils/generateOtp.js";
import jwt from "jsonwebtoken";
import sendOtpEmail from "../utils/email.js";
import User from "../models/User.js";
import validator from "validator";

const logIn = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ status: "fail", message: "Fill up both fields" });
    }

    email = email.trim().toLowerCase();

    if (!validator.isEmail(email)) {
      return res
        .status(401)
        .json({ status: "fail", message: "Invalid email format" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ status: "fail", message: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res.status(401).json({
        status: "fail",
        message: "Please verify your email before logging in.",
      });
    }

    const payload = {
      id: user._id,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      status: "success",
      message: "You have successfully logged in.",
      token: token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ status: "fail", message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not found" });
    }

    if (user.isVerified) {
      return res
        .status(400)
        .json({ status: "fail", message: "Account already verified" });
    }

    const { otp, otpExpires } = generateOtp();

    user.otp = otp;
    user.otpExpires = otpExpires;

    await user.save({ validateBeforeSave: false });
    await sendOtpEmail(user.email, user.otp, user.username);

    res.status(200).json({
      status: "success",
      message: "A new OTP has been sent to your email.",
    });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
};

const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const { otp, otpExpires } = generateOtp();

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
    let { email, otp } = req.body;

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

export { logIn, logOut, resendOtp, signUp, verifyOtp };
