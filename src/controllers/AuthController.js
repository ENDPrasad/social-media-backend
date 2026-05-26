const AuthService = require("../services/AuthService");
const UserService = require("../services/UserService");
const { Log } = require("../services/log");

class AuthController {
  constructor() {
    this.authService = new AuthService();
    this.userService = new UserService();
  }

  async register(payload) {
    return await this.authService.register(payload);
  }

  async login(payload) {
    return await this.authService.login(payload);
  }

  async existingUser(userEmail) {
    try{
      const user = await this.userService.getUserByEmail(userEmail);
      if(user){
        return true;
      }
    }catch(error){
      Log.child({
        errorMessage: error.message,
        errorStack: error.stack
      }).error(`Error in existingUser: ${userEmail}`);
      return false;
    }
  }
}

module.exports = AuthController;
