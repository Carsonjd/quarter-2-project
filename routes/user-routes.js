const path = require('path')
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const morgan = require('morgan');
const knex = require('../knex');
const router = express.Router();

if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'))

app.disable('x-powered-by')
app.use(bodyParser.json())
app.use(cors())

console.log(knex('users'));

router.get('/', (req,res,next) => {
  knex('users')
  .where('id', req.body.id)
  .then(([result])=>result)
});

router.post('/users', (req, res, next) => {
  console.log(req);
})
