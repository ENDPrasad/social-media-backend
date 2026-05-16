const User = require("../models/UserModel");

class UserService {
  async getProfile(userId) {
    const user = await User.findById(userId).select("-password");

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}

module.exports = UserService;
