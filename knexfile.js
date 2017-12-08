'use strict'

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://...'
  },
  test: {
    client: 'pg',
    connection: 'postgres://...'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
