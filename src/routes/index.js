const express = require("express");

const router = express.Router();

const authRoutes = require("./public/authRoutes");
const userRoutes = require("./private/userRoutes");

router.use("/auth", authRoutes);

router.use("/users", userRoutes);

module.exports = router;
