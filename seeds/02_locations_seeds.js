exports.seed = function(knex, Promise) {
  return knex('locations').del()
    .then(function () {
      return knex('locations').insert([{
        id: 1,
        latitude: 50.8,
        longitude: -150.4,
        location_name: 'myPlace',
        added_by_user: 1, },
        {
        id: 2,
        latitude: 50.8,
        longitude: -150.4,
        location_name: 'bellowww',
        added_by_user: 1, },
        {
        id: 3,
        latitude: 50.8,
        longitude: -150.4,
        location_name: 'showboat',
        added_by_user: 3, },
        {
        id: 4,
        latitude: 50.8,
        longitude: -150.4,
        location_name: 'going',
        added_by_user: 2, },
        {
        id: 5,
        latitude: 50.8,
        longitude: -150.4,
        location_name: 'face',
        added_by_user: 3, },
        {
        id: 6,
        latitude: 50.8,
        longitude: -150.4,
        location_name: 'roundabout',
        added_by_user: 2, },
        {
        id: 7,
        latitude: 50.8,
        longitude: -150.4,
        location_name: 'myPlace',
        added_by_user: 5, },
        {
        id: 8,
        latitude: 50.8,
        longitude: -150.4,
        location_name: 'da crib',
        added_by_user: 6 },
        {
        id: 9,
        latitude: 50.8,
        longitude: -150.4,
        location_name: "ho's crib",
        added_by_user: 6}
      ])
    }).then(() => {
      return knex.raw(
        `SELECT setval('locations_id_seq', (SELECT MAX(id) FROM locations))`
      )
    })
};
