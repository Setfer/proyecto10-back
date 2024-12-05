require('dotenv').config()
const cloudinary = require('cloudinary').v2

const deleteAllFiles = async (carpeta) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET
    })
    const url = `Proyecto10/${carpeta}`
    const result = await cloudinary.api.delete_resources_by_prefix(url)
    console.log('todos los archivos eliminados', result)
  } catch (error) {
    console.log(error)
  }
}

module.exports = deleteAllFiles
