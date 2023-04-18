const express = require("express");
const userRouter = require('./routes/user.route')

class Server {
  port = 3000;
  server;
  app = express();

  constructor() {
    this.app.use(express.json())
    this.app.use(userRouter)
    this.app.use('*', (req, res) => {
      res.status(404).json('API not found')
    })
  }

  start() {
    this.server = this.app.listen(this.port, () => {
      console.log(`Server running at http://localhost:${this.port}`);
    });
  }

  shutdown() {
    this.server.close(() => {
      console.log("Closed server on port", this.port);
    });
  }
}

module.exports = Server;
