const expect = chai.expect;
const should = chai.should();
var assert = chai.assert;
const request = require('supertest');
process.env.NODE_ENV = 'test';
const { suite, test } = require('mocha');
const knex = require('../../knex');
const server = require('../../server');

describe('menuView', function(){
  it('is a function', function(){
    expect(menuView).to.be.a('function')
  });
});

var Test = {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [1231223,1233123]
    },
    "properties": {
      "address": "23iuf12308ryfef",
      "city": "fnodvnwofh034",
      "country": "donvowef83023f",
    }
  };

describe('featureBlankReset', function(){
  it('resets the object being used to create new locations', function(){
    expect(featureBlankReset(Test)).to.deep.equal({
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": []
        },
        "properties": {
          "address": "",
          "city": "",
          "country": "",
        }
      });
  });
});

describe('mapboxgl.Map', function(){
  it('is a constructor function', function(){
    assert(new mapboxgl.Map()).not.to.Throw('Error')
  });
});

describe('MapboxGeocoder', function(){
  it('is a constructor function', function(){
    assert(new MapboxGeocoder({
      accessToken: mapboxgl.accessToken
    })).to.not.Throw('Error')
  });
});

// describe('getCurrentPosition', function(){
//   it('returns a geoJSON object', function(){
//     expect(typeof navigator.geolocation.getCurrentPosition(function(position){})).to.equal('object')
//   });
// });


describe('removePopUps', function(){
  it('is not returning an error', function(){
    expect(removePopUps).to.not.Throw('Error')
  });
});
