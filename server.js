const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const morgan = require('morgan')
const uuid = require('uuid/v4')
const cors = require('cors')
const knex = require('./knex');
const bcrypt = require('bcryptjs');

app.disable('x-powered-by')

if (process.env.NODE_ENV === 'development') {app.use(morgan('dev'))}
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors())
app.use(express.static('public'))

// const bananaRoutes = require('./routes')
// app.use('/bananas', bananaRoutes)

// app.use('/signup', 'user-routes');

const routes = require('./routes/user-routes')

app.post('/users', (req, res, next) => {
  // console.log("body >>>", req.body);
  let data = req.body;
  console.log(data);
  knex('users').insert(req.body)
    .then(knex('users').select())
      .then((result) => console.log(result))

  res.status(200).json({message: 'response received'})
})

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({error: err})
})

app.use((req, res, next) => {
  res.status(404).json({error: {message: 'Not found'}})
})

const listener = () => console.log(`Listening on port ${port}!`);
app.listen(port, listener)

module.exports = app
