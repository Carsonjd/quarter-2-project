process.env.NODE_ENV = 'test';
const chai = require('chai')
const expect = chai.expect;
const should = chai.should();
const assert = chai.assert;
const request = require('supertest');
const knex = require('../../knex');
const server = require('../../server.js');
const jsdom = require('mocha-jsdom');
const { suite, test } = require('mocha');

suite('CRUD routes should be created.', () => {

  before((done) => {
  knex.migrate.latest()
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
  });

  beforeEach((done) => {
    knex.seed.run()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

});
