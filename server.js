const express = require('express');
const app = express();
const port = process.env.PORT || 3000
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const knex = require('./knex');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

app.disable('x-powered-by')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors())
app.use(express.static('public'))
app.use(cookieParser())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.get('/users', (req, res, next) => {
  return knex('users')
    .select('*')
    .then((data) => {
      res.status(200).send(data)
    })
})

app.post('/users', (req, res, next) => {
  let data = req.body;
  data.password = bcrypt.hashSync(data.password, salt);
  return knex('users').where({
      user_name: data.user_name
    })
    .then((result) => {
      if (result[0]) {
        res.status(401).json({
          message: 'user name exists',
          code: 3
        });
      } else {
        knex('users').insert(data)
          .then(knex('users').select())
        res.status(201).json({
          message: 'user created',
          code: 4,
        })
      }
    })
})


app.post('/login', (req, res, next) => {
  const {
    user_name,
    password
  } = req.body;
  knex('users').where({
      user_name: user_name
    })
    .then((result) => {
      if (!result[0]) {
        res.status(401).json({
          message: 'user name not found',
          code: 1
        });
      } else {
        if (bcrypt.compareSync(password, result[0].password)) {
          userToken = jwt.sign({
            username: user_name,
            id: result[0].id
          }, 'topsecret');
          res.status(200).json({
            message: 'response received',
            code: 0,
            token: userToken
          })
        } else {
          res.status(401).json({
            message: 'incorrect password',
            code: 2
          });

        }
      }
    })
})



app.get('/user-favs', (req, res, next) => {
  let userID;
  let token = req.cookies.token;
  jwt.verify(token, 'topsecret', (err, decoded) => {
    userID = decoded.id;
  })
  return knex('locations').where('added_by_user', userID)
    .then((result) => {
      res.status(200).json({
        message: 'cool',
        locations: result
      })
    })
})


app.post('/add-location', (req, res, next) => {
  let userID;
  let token = req.cookies.token;
  jwt.verify(token, 'topsecret', (err, decoded) => {
    userID = decoded.id;
  })
  let data = {
    latitude: req.body.lng,
    longitude: req.body.lat,
    location_name: req.body.location_name,
    added_by_user: userID
  }
  knex('locations').insert(data)
    .then((result) => console.log(result));
})

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    error: err
  })
})

app.use((req, res, next) => {
  res.status(404).json({
    error: {
      message: 'Not found'
    }
  })
})

const listener = () => console.log(`Listening on port ${port}!`);
app.listen(port, listener)

module.exports = app
