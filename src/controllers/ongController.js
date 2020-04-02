const connection = require('../database/index');
const crypto = require('crypto');

module.exports = {
  async store(req, res) {
    const {
      name,
      interests,
      street,
      number,
      neighborhood,
      city,
      uf,
      whatsapp
    } = req.body;

    const id = crypto.randomBytes(4).toString('HEX');

    await connection('ongs').insert({
      id,
      name,
      interests,
      street,
      number,
      neighborhood,
      city,
      uf,
      whatsapp
    });

    return res.status(201).json({ id: id });
  }
};
