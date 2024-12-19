const mongoose = require('mongoose')

const eventoSchema = new mongoose.Schema(
  {
    evento: { type: String, required: true },
    fecha: { type: Date, required: true },
    cartel: { type: String, required: true },
    asistentes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'usuarios' }],
    descripcion: { type: String, required: true },
    organizador: { type: String }
    
  },
  {
    timestamps: true,
    collection: 'eventos'
  }
)

const Evento = mongoose.model('eventos', eventoSchema, 'eventos')
module.exports = Evento