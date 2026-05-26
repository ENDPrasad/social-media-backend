const express = require("express");

const router = express.Router();

const AuthController = require("../../controllers/AuthController");

const validateMiddleware = require("../../middlewares/validateMiddleware");
const authMiddleware = require("../../middlewares/authMiddleware");

const {
  registerValidation,
  loginValidation,
} = require("../../validations/authValidation");
const { Log } = require("../../services/log");

const authController = new AuthController();

router.post(
  "/register",
  validateMiddleware(registerValidation()),
  async (req, res) => {
    try {
      const isExistinUser = await authController.existingUser(req.body.email);
      if (isExistinUser) {
        return res.status(409).json({
          success: false,
          message: "User already exists",
        });
      }

      const data = await authController.register(req.body);

      return res.status(201).json({
        success: true,
        data,
      });

    } catch (error) {
      Log.child({
        errorMessage: error.message,
        errorStack: error.stack,
      }).error("Error in /register route");
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
);

router.post(
  "/login",
  validateMiddleware(loginValidation()),
  async (req, res) => {
    try {
      const isUserExists = await authController.existingUser(req.body.email);
      
      if(!isUserExists){
        return res.status(404).json({
          success: false,
          messsage: "User not found"
        });
      }

      const data = await authController.login(req.body);

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      Log.child({
        errorMessage: error.message,
        errorStack: error.stack,
      }).error("Error in /login route");
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  },
);


module.exports = router;
