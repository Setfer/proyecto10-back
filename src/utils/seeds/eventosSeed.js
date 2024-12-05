const mongoose = require('mongoose')
const deleteAllFiles = require('../deleteAllFiles')
const Evento = require('../../api/models/eventos')
const eventosData = require('../../data/eventos/eventosArray')
const cloudinary = require('cloudinary').v2
require('dotenv').config()

const lanzarSemilla = async () => {
  try {
    await deleteAllFiles('eventos')
    await mongoose.connect(process.env.DB_URL)
    await Evento.collection.drop()
    for (const evento of eventosData) {
      console.log(evento)
      const imgPath = evento.cartel
      console.log(imgPath)
      const upCloudinary = await cloudinary.uploader.upload(imgPath, {
        folder: 'Proyecto10/eventos'
      })
      console.log(upCloudinary.url)
      const newEvento = new Evento({
        evento: evento.evento,
        fecha: evento.fecha,
        cartel: upCloudinary.url,
        descripcion: evento.descripcion
      })
      await newEvento.save()
    }
    mongoose.connection.close()
  } catch (error) {
    console.log(error)
  }
}

lanzarSemilla()
