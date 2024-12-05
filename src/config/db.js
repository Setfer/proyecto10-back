const mongoose = require('mongoose')


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('Conectado a la Base de Datos')
  } catch (error) {
    console.log('Error al conectarse')
  }
}

module.exports = { connectDB }
