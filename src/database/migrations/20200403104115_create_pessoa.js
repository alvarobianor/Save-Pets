exports.up = function(knex) {
  return knex.schema.createTable('pessoas', t => {
    t.increments();
    t.string('name');
    t.string('whatsapp');
    t.string('city');
    t.string('UF');
    t.string('password');
  });
};

exports.down = function(knex) {
  return knex.dropTable('pessoas');
};
