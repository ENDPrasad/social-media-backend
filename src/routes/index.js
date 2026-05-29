const express = require("express");

const router = express.Router();

const authRoutes = require("./public/authRoutes");
const userRoutes = require("./private/userRoutes");
const postRoutes = require("./private/postRoutes");

router.use("/auth", authRoutes);

router.use("/users", userRoutes);

router.use("/posts", postRoutes);

module.exports = router;
