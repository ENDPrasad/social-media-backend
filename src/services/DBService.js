const mongoose = require("mongoose");
const config = require("../config/db");

class DBService {
  async connect() {
    await mongoose.connect(config.mongoURI);

    console.log("MongoDB Connected");
  }
}

module.exports = DBService;
