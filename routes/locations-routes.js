const router = require('express.router')
const knex = require('../knex.js')

router.get('/locations', (req, res) => {
  const data = notes.get()
  let result = data.map(note => note)
  res.json(result)
})

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
