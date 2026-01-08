import User from "../models/User.js";
import { sendWelcomeEmail } from "../utils/email.js";

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newUser = await User.create({
      username,
      email,
      password,
    });

    sendWelcomeEmail(newUser.email, newUser.username).catch((err) =>
      console.error(err),
    );

    res.status(201).json({
      status: "success",
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

export default { signup };
