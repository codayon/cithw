import User from "../models/User.js";

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const someData = await User.find({ email });

    if (someData.length > 0) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide another email",
      });
    }

    const newUser = await User.create({
      username,
      email,
      password,
    });

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
