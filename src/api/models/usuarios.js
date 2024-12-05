const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const usuarioSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    correo: { type: String, required: true },
    password: { type: String, required: true },
    eventos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'eventos' }],
    avatar: { type: String, required: true },
    admin: { type: Boolean, default: false, required: true }
  },
  {
    timestamps: true,
    collection: 'usuarios'
  }
)

usuarioSchema.pre('save', function () {
  this.password = bcrypt.hashSync(this.password, 10)
})

const Usuario = mongoose.model('usuarios', usuarioSchema, 'usuarios')
module.exports = Usuario
