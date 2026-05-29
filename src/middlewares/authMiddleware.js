const jwt = require("jsonwebtoken");

const User = require("../models/UserModel");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.userId);

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};


const setIsMe = async (req, res, next) => {
  req.isMe = true;
  next()
}

module.exports = {authMiddleware, setIsMe};
