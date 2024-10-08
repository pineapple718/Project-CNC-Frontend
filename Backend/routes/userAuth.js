require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = req.header && authHeader.split(" ")[1];
  

  if (token == null) {
    return res.status(401).json({ message: "Authentication token required" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Token required. Please signIn again" });
    }
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };