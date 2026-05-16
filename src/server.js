require("dotenv").config();

const app = require("./app");
const DBService = require("./services/DBService");

const PORT = process.env.PORT || 3000;

class Server {
  static async start() {
    try {
      await DBService.connect();

      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    } catch (error) {
      console.log(error);
    }
  }
}

Server.start();
