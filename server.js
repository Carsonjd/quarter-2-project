const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const morgan = require('morgan')
const uuid = require('uuid/v4')
const cors = require('cors')
const knex = require('./knex');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

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
  let data = req.body;
  data.password = bcrypt.hashSync(data.password, salt);
  knex('users').insert(data)
    .then(knex('users').select())
      .then((result) => console.log(result))

  res.status(200).json({message: 'response received'})
})

app.post('/login', (req, res, next) => {
  const {user_name, password} = req.body;
  console.log(req.body);
  knex('users').where({user_name: user_name})
    .then((result) => {
      console.log(result);
      if (!result[0]) {
        console.log("user not found");
        res.status(404).json({message: 'user name not found', code: 1});
      } else { //verify password here?
        console.log('success maybe');
        res.status(200).json({message: 'response received'})
      }
    })
})

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({error: err})
})

app.use((req, res, next) => {
<<<<<<< HEAD
  res.status(404).json({error: { message: 'Not F-in found' }})
=======
  res.status(404).json({error: {message: 'Not found'}})
>>>>>>> cb0178dae7d051c32d5540ea9fdce59df72dbbdd
})

const listener = () => console.log(`Listening on port ${port}!`);
app.listen(port, listener)

module.exports = app
