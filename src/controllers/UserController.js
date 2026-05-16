const UserService = require("../services/UserService");

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  async profile(userId) {
    return await userService.getProfile(userId);
  }
}

module.exports = UserController;
