import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "You are not logged in. Please login to get access.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if token is valid
    // const currentUser = await User.findById(decoded.id);
    // if (!currentUser) {
    //   return res.status(401).json({ message: "User no longer exists" });
    // }

    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      status: "fail",
      message: "Invalid token or session expired. Please log in again.",
    });
  }
};

export { protect };
