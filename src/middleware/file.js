const cloudinary = require('cloudinary').v2
const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary')


const createCloudinaryStorage = (folder) => {
  return new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: folder,
      allowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif', 'jfif']
    }
  })
}

const createUploader = (folder) => {
  const storage = createCloudinaryStorage(folder)
  return multer({ storage: storage })
}

const uploadEvento = createUploader('Proyecto10/eventos')
const uploadAvatar = createUploader('Proyecto10/avatares')

module.exports = { uploadEvento, uploadAvatar }
