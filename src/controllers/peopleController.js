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

  index = async (req, res) => {
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
  };

  indexOf = async (req, res) => {
    const auth = req.headers.authorization;

    const verify = await connection('pessoas').where('id', auth).select('id');

    if (verify.length == 0 || !auth) {
      return res.status(401).json({
        error: "try again, you aren't logged or you are Unauthorized",
      });
    }

    const { interests } = req.params;
    const { city } = req.query;

    const promisseOngs = await connection('interests')
      .where('interest', interests)
      .select('ong_id');

    const ongs = await Promise.all(
      promisseOngs.map(async (ong) => {
        if (!city) {
          return await connection('ongs').where('id', ong.ong_id).select('*');
        } else {
          return await connection('ongs')
            .where('id', ong.ong_id)
            .andWhere('city', city)
            .select('*');
        }
      })
    );

    res.json({
      ongs: ongs
        .filter((ong) => {
          return ong[0] != null;
        })
        .map(([ong]) => ong),
    });
  };
}

module.exports = new Controller();
