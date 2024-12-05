const mongoose = require('mongoose')
const deleteAllFiles = require('../deleteAllFiles')
const Usuario = require('../../api/models/usuarios')
const cloudinary = require('cloudinary').v2
require('dotenv').config()
const usuariosData = require('../../data/usuarios/usuariosArray')

const lanzarSemilla = async () => {
  try {
    await deleteAllFiles('avatares')
    await mongoose.connect(process.env.DB_URL)
    await Usuario.collection.drop()
    for (const usuario of usuariosData) {
      console.log(usuario)
      const imgPath = usuario.avatar
      console.log(imgPath)
      const upCloudinary = await cloudinary.uploader.upload(imgPath, {
        folder: 'Proyecto10/avatares'
      })
     
 
      const newUsuario = new Usuario({
        nombre: usuario.nombre,
        correo: usuario.correo,
        avatar: upCloudinary.url,
        password: usuario.password
      })
      await newUsuario.save()
    }
    mongoose.connection.close()
  } catch (error) {
    console.log(error)
  }
}

lanzarSemilla()
