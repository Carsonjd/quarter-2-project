
exports.seed = function (knex, Promise) {
  return knex('users_locations').del()
    .then(function () {
      return knex('users_locations').insert([{
        id: 1,
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
