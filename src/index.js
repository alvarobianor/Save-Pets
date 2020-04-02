const express = require('express');
const routes = require('./routes');
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

  routes() {
    this.server.use(routes);
  }
  middlewares() {
    this.server.use(express.json());
  }
}

module.exports = new App();
