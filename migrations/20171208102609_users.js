
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments()
    table.string('First Name').notNullable().defaultsTo('')
    table.string('Last Name').notNullable().defaultsTo('')
    table.string('User Name').notNullable().defaultsTo('')
    table.string('Email').notNullable().defaultsTo('')
    table.string('Password').notNullable().defaultsTo('')
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
