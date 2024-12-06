
require('dotenv').config()
const express = require('express')
const { connectDB } = require('./src/config/db')
const connectCloudinary = require('./src/config/cloudinary')
const userRoutes = require('./src/api/routes/usuarios')
const eventoRouter = require('./src/api/routes/eventos')
const app = express()
const cors = require('cors')

app.use(express.json())

connectDB()
connectCloudinary()

app.use(cors())
app.use('/api/v1/usuarios', userRoutes)
app.use('/api/v1/eventos', eventoRouter)

app.use('*', (req, res, next) => {
  return res.status(404).json('Route not found')
})

app.listen(10000 , () => {
  console.log('El servidor está funcionando en: http://localhost:10000')
})
