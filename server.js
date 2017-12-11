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
const userRoutes = require('./routes/user-routes.js')

app.use('/locations', locationsRoutes)
app.use('/users_locations', usersLocationsRoutes)
app.disable('x-powered-by')

if (process.env.NODE_ENV === 'development') {app.use(morgan('dev'))}
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors())
app.use(express.static('public'))


// app.use('/signup', 'user-routes');
app.use('/users', userRoutes)
app.use('/login', userRoutes)




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
