export default function nextFn(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader === process.env.JWT_SECRET) {
    next();
  } else {
    res.status(401).json({ error: "You are not allowed" });
  }
}
