const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middlewares/authMiddleware");
const UserController = require("../../controllers/UserController");

// Object Initialisation

const userController = new UserController();

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const data = await userController.profile(req.user._id);

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
