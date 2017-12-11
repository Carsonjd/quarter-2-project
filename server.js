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
// const routes = require('./routes/user-routes')
const usersLocationsRoutes = require('./routes/users-locations-routes.js')
const locationsRoutes = require('./routes/locations-routes.js')

app.use('/locations', locationsRoutes)
app.use('/users_locations', usersLocationsRoutes)
app.disable('x-powered-by')

if (process.env.NODE_ENV === 'development') {app.use(morgan('dev'))}
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors())
app.use(express.static('public'))


// app.use('/signup', 'user-routes');


app.post('/users', (req, res, next) => {
  let data = req.body;
  data.password = bcrypt.hashSync(data.password, salt);
  knex('users').insert(data)
    .then(knex('users').select())
      .then((result) => console.log(result))

  res.status(201).json({message: 'user created'})
})

app.post('/login', (req, res, next) => {
  const {user_name, password} = req.body;
  knex('users').where({user_name: user_name})
    .then((result) => {
      if (!result[0]) {
        console.log("user not found");
        res.status(401).json({message: 'user name not found', code: 1});
      } else {
        if (bcrypt.compareSync(password, result[0].password)) {
          console.log('correct password');
          res.status(200).json({message: 'response received', code: 0})
        } else {
          console.log("password incorrect");
          res.status(401).json({message: 'incorrect password', code: 2});

        }
      }
    })
})

app.get('/user-favs', (req, res, next) => {
  console.log('you hit the route');
  let userLocs;
  return knex('locations').where('added_by_user', 6)
    .then((result) => {
    // return result;
    console.log(result);
    res.status(200).json({message: 'cool', data: result})
    // console.log(result);
    // return userLocs;
  })
  console.log(result);
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
