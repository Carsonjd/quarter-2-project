
exports.seed = function (knex, Promise) {
  return knex('users_locations').del()
    .then(function () {
      return knex('users_locations').insert([{
        id: 1,
        added_by_user: 2,
        locations_id: 1,
      },
      {
        id: 2,
        added_by_user: 3,
        locations_id: 4,
      },
      {
        id: 3,
        added_by_user: 1,
        locations_id: 3,
      },
      {
        id: 4,
        added_by_user: 3,
        locations_id: 3,
      },
      {
        id: 5,
        added_by_user: 4,
        locations_id: 3,
      },
      {
        id: 6,
        added_by_user: 5,
        locations_id: 4,
      },
      ])
    }).then(() => {
      return knex.raw(
        `SELECT setval('users_locations_id_seq', (SELECT MAX(id) FROM users_locations))`
      )
    })
};
