const express = require('express')
const router = express.Router()
const knex = require('../knex.js')



router.get('/', (req,res,next) => {
  return knex('users_locations')
  .then((data) => {
    console.log(data)
    res.status(200).send(data)
  })
});






module.exports = router
