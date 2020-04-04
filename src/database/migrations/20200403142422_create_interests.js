exports.up = function (knex) {
  return knex.schema.createTable('interests', (t) => {
    t.increments();
    t.string('interest');

    t.string('ong_id').notNullable();
    t.foreign('ong_id').references('id').inTable('ongs');
  });
};

exports.down = function (knex) {
  return knex.dropTable('interests');
};
