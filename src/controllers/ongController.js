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
      whatsapp,
    } = req.body;

    const id = crypto.randomBytes(4).toString('HEX');

    await connection('ongs').insert({
      id,
      name,
      street,
      number,
      neighborhood,
      city,
      uf,
      whatsapp,
    });

    const _interests = interests.split(' ');
    _interests.forEach(async (interest) => {
      await connection('interests').insert({
        ong_id: id,
        interest: _interests,
      });
    });

    res.append('X-id', id);
    return res.status(201).json({ id: id });
  },

  async index(req, res) {},
};
