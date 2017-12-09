
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users_loctions').del()
    .then(function () {
      // Inserts seed entries
      return knex('users_locations').insert([{
        users_id: 1,
        locations_id: 1
      }

      ])
    }).then(() => {
      return knex.raw(
        `SELECT setval('users_locations_id_seq', (SELECT MAX(id) FROM users_locations))`
      )
    })
};
