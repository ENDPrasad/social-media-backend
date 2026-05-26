const bcrypt = require("bcryptjs");

const User = require("../models/UserModel");

const generateToken = require("../utils/generateToken");

const UserService = require("./UserService");
const { Log } = require("./log");


class AuthService {


  constructor(){
    this.userService = new UserService();
  }

  async register(payload) {
    const { name, email, password } = payload;

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

    const user = await this.userService.authenticateUser(payload);

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
