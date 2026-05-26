const User = require("../models/UserModel");
const { Log } = require("../services/log");
const bcrypt = require("bcryptjs");

class UserService {
  async getProfile(userId) {
    try{
      const user = await User.findById(userId).select("-password");

      if (!user) {
        throw new Error("User not found");
      }

      return user;

    }catch(error){
      Log.child({
        errorMessage: error.message,
        errorStack: error.stack
      }).error(`Error in getProfile: ${userId}`);
      throw error;
    }
  }


  async getUserByEmail(userEmail) {
    try{
      const user = await User.findOne({email: userEmail});

      if(!user){
        throw new Error("User not found");
      }

      return user;

    }catch(error){
      Log.child({
        errorMessage: error.message,
        errorStack: error.stack
      }).error(`Error in getUserByEmail: ${userEmail}`);
      throw error;
    }
  }

  async authenticateUser(payload){
    try{
      const {email, password} = payload;
      const user = await User.findOne({email: email}).select("+password");
      const isPasswordMatched = await bcrypt.compare(password, user.password);

      if (!isPasswordMatched){
        throw new Error("Invalid credentials");
      }

      delete user.password;

      return user

    }catch(error){
      Log.child({
        errorMessage: error.message,
        errorStack: error.stack
      }).error(`Error in authenticateUser: ${payload.email}`);
      throw error;
    }


  }
}



module.exports = UserService;
