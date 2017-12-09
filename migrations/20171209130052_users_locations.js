
exports.up = function (knex, Promise) {
  return Promise.join('users_locations', table => {
    table.integer('users_id').notNullable()
    table.foreign('users_id').references('users.id').onDelete('CASCADE')
    table.integer('locations_id').notNullable()
    table.foreign('locations_id').references('locations.id').onDelete('CASCADE')
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users_locations')
};
