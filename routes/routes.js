const path = require('path')
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const morgan = require('morgan')

if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'))

app.disable('x-powered-by')
app.use(bodyParser.json())
app.use(cors())


router.get('/', (req,res,next) => {
  knex('users')
  .where('id', req.body.id)
  .then(([result])=>result)
});
