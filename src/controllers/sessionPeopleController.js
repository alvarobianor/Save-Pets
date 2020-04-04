const connection = require('../database/index');

module.exports = {
  async store(req, res) {
    const { name, password } = req.body;

    const headerId = await connection('pessoas')
      .where('name', name)
      .andWhere('password', password)
      .select('id')
      .first();

    // the correct is try first the name, and after the password

    if (!headerId) {
      return res.status(400).json('Try again');
    }
    res.append('X-loged-people', headerId.id);

    res.status(201).json({ Login: 'ok' });
  },
};
