exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([{
        id: 1,
        first_name: 'Bill',
        last_name: 'Bixley',
        user_name: 'BuffaloBill',
        email: 'him@you.me',
        password: 'password', },
        {
          id: 2,
          first_name: 'Betty',
          last_name: 'Bixley',
          user_name: 'BouncingBetty',
          email: 'you@her.me',
          password: 'password2', },
        {
          id: 3,
          first_name: 'Annie',
          last_name: 'Oakley',
          user_name: 'AnnaBanana',
          email: 'banana@fruit.me',
          password: 'password3', },
        {
          id: 4,
          first_name: 'Buddy',
          last_name: 'Holly',
          user_name: 'Buddyboy',
          email: 'guitar@fruit.me',
          password: 'password3', },
        {
          id: 5,
          first_name: 'Jeff',
          last_name: 'Austin',
          user_name: 'AJeffa',
          email: 'Jeffa@fruit.me',
          password: 'password3', },
      ])
    }).then(() => {
      return knex.raw(
        `SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))`
      )
    })
};
