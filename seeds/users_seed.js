
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {first_name: 'Bill'},
        {last_name: 'Bixley'},
        {user_name: 'BuffaloBill'},
        {email: 'him@you.me'},
        {password: 'password'}
      ]);
    });
};
