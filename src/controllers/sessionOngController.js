const connection = require('../database/index');

module.exports = {
  async store(req, res) {
    const { id } = req.body;

    const headerId = await connection('ongs')
      .where('id', id)
      .select('id')
      .first();

    // the correct is try first the name, and after the password

    if (!headerId) {
      return res.status(400).json('Try again');
    }
    res.append('X-loged-ong', headerId.id);

    res.status(201).json({ Login: 'ok' });
  },
};
