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

router.post('/users', (req, res, next) => {
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
        console.log(password)
        // console.log('success maybe');
        res.status(200).json({message: 'response received'})
      }
    })
})

router.get('/', (req,res,next) => {
  knex('users')
  // .where('id', req.body.id)
  .then(([result])=>result)
});

router.post('/users', (req, res, next) => {
  console.log(req);
})

module.exports = router;
