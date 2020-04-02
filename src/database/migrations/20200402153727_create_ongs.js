exports.up = function(knex) {
  return knex.schema.createTable('ongs', t => {
    t.string('id').primary();
    t.string('name').notNullable();
    t.string('interests').notNullable(); //ex |a b c d e f| está contido nessa tabela
    t.string('street').notNullable();
    t.integer('number').notNullable();
    t.string('neighborhood').notNullable();
    t.string('city').notNullable();
    t.string('UF', 2).notNullable();
    t.string('whatsapp').notNullable();
  });
};

exports.down = function(knex) {
  return knex.dropTable('ongs');
};
