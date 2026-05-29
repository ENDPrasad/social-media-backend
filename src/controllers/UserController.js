const UserService = require("../services/UserService");

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  async profile(userId) {
    return await this.userService.getProfile(userId);
  }

}

module.exports = UserController;
