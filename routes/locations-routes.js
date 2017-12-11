const express = require('express')
const router = express.Router()
const knex = require('../knex.js')



router.get('/', (req,res,next) => {
  return knex('locations')
  .then((data) => {
    console.log(data)
    res.status(200).send(data)
  })
});


// router.get('/notes/:id', (req, res) => {
//   const id = req.params.id
//   const data = notes.find({ prop: [ 'id', id ] })
//   res.json(data)
// })
//
// router.post('/notes', (req, res) => {
//   const id = uuid()
//   const note = { id, ...req.body }
//   const data = notes.create(note)
//   res.status(201).json(data)
// })
//
// router.put('/notes/:id', (req, res) => {
//   const id = req.params.id
//   const note = { ...req.body }
//   const data = notes.update({ prop: [ 'id', id ] }, note)
//   res.json(data)
// })
//
// router.delete('/notes/:id', (req, res) => {
//   const id = req.params.id
//   const data = notes.destroy({ prop: [ 'id', id ] })
//   res.json(data)
// })

module.exports = router
