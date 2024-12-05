const cloudinary = require('cloudinary').v2

const deleteFile = (url) => {
  const parts = url.split('/')

  const filePath = parts.slice(7).join('/').split('.')[0]
  console.log(filePath)
  cloudinary.uploader.destroy(filePath, () => {
    console.log('imagen eliminada')
  })
}

module.exports = { deleteFile }
