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
    if (_interests.lenght <= 1) {
      _interests.push(interest);
    }
    _interests.forEach(async (interest) => {
      await connection('interests').insert({
        ong_id: id,
        interest,
      });
    });

    res.append('X-id', id);
    return res.status(201).json({ id: id });
  },

  async index(req, res) {
    const { page = 1 } = req.query;

    const listOngs = await connection('ongs')
      .limit(3)
      .offset((page - 1) * 3)
      .select('*');

    const interests = await Promise.all(
      listOngs.map(async (ong) => {
        return (
          await connection('interests')
            .where('ong_id', ong.id)
            .select('interest')
        ).map((obj) => obj.interest);
      })
    );

    listOngs.forEach((ong) => {
      [ong.interest] = interests;
    });
    return res.status(200).json({ ong: listOngs });
  },

  async indexOf(req, res) {
    const { interests } = req.params;

    const promisseOngs = await connection('interests')
      .where('interest', interests)
      .select('ong_id');

    const ongs = await Promise.all(
      promisseOngs.map(async (ong) => {
        return await connection('ongs').where('id', ong.ong_id).select('*');
      })
    );
    res.json({ ongs: ongs.map((ong) => ong[0]) });
  },
};
