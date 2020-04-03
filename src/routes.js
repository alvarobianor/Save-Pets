const express = require('express');

const ongController = require('./controllers/ongController');
const peopleController = require('./controllers/peopleController');

const routes = express.Router();

routes.get('/', (req, res) => {
  return res.json({ Alvaro: 'Bianor' });
});

routes.post('/ong', ongController.store);

//

routes.post('/people', peopleController.store);

module.exports = routes;
