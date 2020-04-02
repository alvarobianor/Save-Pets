const express = require('express');

const ongController = require('./controllers/ongController');
const routes = express.Router();

routes.get('/', (req, res) => {
  return res.json({ Alvaro: 'Bianor' });
});

routes.post('/ong', ongController.store);

module.exports = routes;
