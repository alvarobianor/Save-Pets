const express = require('express');
const routes = require('./routes');
const cors = require('cors');

class App {
  constructor() {
    this.init();
    this.middlewares();
    this.routes();
  }
  init() {
    this.server = express();
    this.server.listen(3333);
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }
  routes() {
    this.server.use(routes);
  }
}

module.exports = new App();
