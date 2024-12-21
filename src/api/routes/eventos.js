const { uploadEvento } = require('../../middleware/file')
const { isAuth } = require('../../middleware/isAuth')
const {
  getAllEventos,
  postEvento,
  updateEvento,
  deleteEvento,
  removeUsuarioEvento,
  getAllEventosByName,
  getAllEventosByDate,
  getAllEventosByAssistants
} = require('../controllers/eventos')

const eventoRouter = require('express').Router()

eventoRouter.get('/', getAllEventos)
eventoRouter.get("/order-by-name", getAllEventosByName)
eventoRouter.get("/order-by-date", getAllEventosByDate)
eventoRouter.get("/order-by-assistants", getAllEventosByAssistants)
eventoRouter.post('/', isAuth, uploadEvento.single('cartel'), postEvento)
eventoRouter.put('/:id', isAuth, uploadEvento.single('cartel'), updateEvento)
eventoRouter.delete('/:id',isAuth, deleteEvento)
eventoRouter.put('/removeusuario/:id', removeUsuarioEvento)
module.exports = eventoRouter
