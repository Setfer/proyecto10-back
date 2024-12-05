const { uploadAvatar } = require('../../middleware/file')
const { isAuth } = require('../../middleware/isAuth')
const {
  register,
  login,
  getUsuarios,
  updateUsusario,
  deleteUsuario,
  getUserById,
  removeEventoUsuario
} = require('../controllers/usuarios')
const userRouter = require('express').Router()

userRouter.post('/registro', uploadAvatar.single('avatar'), register)
userRouter.post('/login', login)
userRouter.get('/', getUsuarios)
userRouter.get('/:id', isAuth, getUserById)
userRouter.put('/:id', isAuth, uploadAvatar.single('avatar'), updateUsusario)
userRouter.put('/removeevento/:id', isAuth, removeEventoUsuario)
userRouter.delete('/:id', deleteUsuario)
module.exports = userRouter
