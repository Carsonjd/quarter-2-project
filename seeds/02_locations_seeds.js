
exports.seed = function(knex, Promise) {
  return knex('locations').del()
    .then(function () {
      return knex('locations').insert([{
        id: 1,
        latitude: 50.8,
        longitude: -150.4,
        location_name: 'myPlace',
        added_by_user: 1}
      ])
    }).then(() => {
      return knex.raw(
        `SELECT setval('locations_id_seq', (SELECT MAX(id) FROM locations))`
      )
    })
};
