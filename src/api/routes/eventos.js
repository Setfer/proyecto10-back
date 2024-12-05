const { uploadEvento } = require('../../middleware/file')
const { isAuth } = require('../../middleware/isAuth')
const {
  getAllEventos,
  postEvento,
  updateEvento,
  deleteEvento,
  removeUsuarioEvento
} = require('../controllers/eventos')

const eventoRouter = require('express').Router()

eventoRouter.get('/', getAllEventos)

eventoRouter.post('/', isAuth, uploadEvento.single('cartel'), postEvento)
eventoRouter.put('/:id', isAuth, uploadEvento.single('cartel'), updateEvento)
eventoRouter.delete('/:id', deleteEvento)
eventoRouter.put('/removeusuario/:id', removeUsuarioEvento)
module.exports = eventoRouter
