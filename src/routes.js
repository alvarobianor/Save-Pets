const express = require('express');

const ongController = require('./controllers/ongController');
const peopleController = require('./controllers/peopleController');
const sessionPeopleController = require('./controllers/sessionPeopleController');
const sessionOngController = require('./controllers/sessionOngController');

const routes = express.Router();

routes.get('/', (req, res) => {
  return res.json({ Alvaro: 'Bianor' });
});

routes.post('/ong', ongController.store);
routes.get('/ongs', ongController.index);

// people

routes.get('/ongs/:interests', peopleController.indexOf);
routes.post('/people', peopleController.store);

// session

routes.post('/sessionPeople', sessionPeopleController.store);
routes.post('/sessionOng', sessionOngController.store);

module.exports = routes;
