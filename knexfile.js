'use strict'

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost:5432/WS'
  },
  // test: {
  //   client: 'pg',
  //   connection: 'postgres://'
  // },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
