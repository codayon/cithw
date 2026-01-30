const protect = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({
      status: "fail",
      message: "You are not logged in. Please login to get access.",
    });
  }

  next();
};

export { protect };
