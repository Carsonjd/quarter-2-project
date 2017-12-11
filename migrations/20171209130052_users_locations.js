
exports.up = function (knex, Promise) {
  return knex.schema.createTable('users_locations', table => {
    table.increments()
    table.integer('added_by_user').notNullable()
    table.foreign('added_by_user').references('users.id').onDelete('CASCADE')
    table.integer('locations_id').notNullable()
    table.foreign('locations_id').references('locations.id').onDelete('CASCADE')
  })
};
//
// exports.down = function (knex, Promise) {
//   return knex.schema.dropTable('users_locations')
// };

// table.integer('users_id').notNullable()
// table.foreign('users_id').references('users.id').onDelete('CASCADE')
