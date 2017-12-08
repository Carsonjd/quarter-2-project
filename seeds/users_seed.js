exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([{
        id: 1,
        first_name: 'Bill',
        last_name: 'Bixley',
        user_name: 'BuffaloBill',
        email: 'him@you.me',
        password: 'password'}
      ])
    }).then(() => {
      return knex.raw(
        `SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))`
      )
    })
};
