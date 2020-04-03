const connection = require('../database/index');

class Controller {
  constructor() {}

  store = async (req, res) => {
    const { name, password, whatsapp, city, UF } = req.body;

    const [id] = await connection('pessoas').insert({
      name,
      password,
      whatsapp,
      city,
      UF,
    });

    return res.status(201).json({ id: id });
  };

  index = async (req, res) => {};
}

module.exports = new Controller();
