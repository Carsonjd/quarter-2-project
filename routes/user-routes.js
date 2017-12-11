const path = require('path')
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const morgan = require('morgan');
const knex = require('../knex');
const router = express.Router();

if (process.env.NODE_ENV !== 'test') {app.use(morgan('dev'))}

app.disable('x-powered-by')
app.use(bodyParser.json())
app.use(cors())

router.get('/signup', (req, res, next) => {
  console.log('ok');
})

router.get('/', (req, res, next) => {
  return knex('users_locations')
  .join('locations', 'locations.id', '=', 'users_locations.location_id')
  .select(locations)
  .then((data) => {
    console.log(data)
    res.status(200).send(data)
  })
});

router.get('/:id/locations', (req,res,next) => {
  let id = req.params.id
  return knex('users')
  .where('users.id', '=', id)
  .join('users_locations', 'users.id', '=', 'users_locations.added_by_user')
  .join('locations', 'locations.id', '=', 'users_locations.locations_id')
  // .select('locations_id', 'added_by_user', 'location_name')
  .then((data) => {
    console.log(data)
    res.status(200).send(data)
  })
});


router.get('/', (req,res,next) => {
  knex('users')
  // .where('id', req.body.id)
  .then(([result])=>result)
});

router.post('/users', (req, res, next) => {
  console.log(req);
})

module.exports = router;
