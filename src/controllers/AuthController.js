const AuthService = require("../services/AuthService");

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  async register(payload) {
    return await authService.register(payload);
  }

  async login(payload) {
    return await authService.login(payload);
  }
}

module.exports = AuthController;
