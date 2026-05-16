const bcrypt = require("bcryptjs");

const User = require("../models/UserModel");

const generateToken = require("../utils/generateToken");

class AuthService {
  async register(payload) {
    const { name, email, password } = payload;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },

      token: generateToken(user._id),
    };
  }

  async login(payload) {
    const { email, password } = payload;

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new Error("Invalid credentials");
    }

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },

      token: generateToken(user._id),
    };
  }
}

module.exports = AuthService;
