
exports.seed = function(knex, Promise) {
  return knex('locations').del()
    .then(function () {
      return knex('locations').insert([{
        id: 1,
        latitude: 50.8,
        longitude: -150.4,
        location_name: 'myPlace',
        },
        {
        id: 2,
        latitude: 50.8,
        longitude: -150.4,
        location_name: 'bellowww',
        },
        {
        id: 3,
        latitude: 50.8,
        longitude: -150.4,
        location_name: 'showboat',
        },
        {
        id: 4,
        latitude: 50.8,
        longitude: -150.4,
        location_name: 'going',
        },
        {
        id: 5,
        latitude: 50.8,
        longitude: -150.4,
        location_name: 'face',
        },
        {
        id: 6,
        latitude: 50.8,
        longitude: -150.4,
        location_name: 'roundabout',
        },
        {
        id: 7,
        latitude: 50.8,
        longitude: -150.4,
        location_name: 'myPlace',
        },
      ])
    }).then(() => {
      return knex.raw(
        `SELECT setval('locations_id_seq', (SELECT MAX(id) FROM locations))`
      )
    })
};
