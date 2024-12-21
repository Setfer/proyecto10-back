const { deleteFile } = require('../../utils/deleteFile')
const Evento = require('../models/eventos')


const getAllEventos = async (req, res, next) => {
  try {
    const allEventos = await Evento.find().populate("asistentes")
    return res.status(200).json(allEventos)
  } catch (error) {
    return res.status(400).json('No se han podido obtener los eventos')
  }
}

const getAllEventosByName = async (req, res, next) => {
  try {
    const allEventos = await Evento.find()
      .populate("asistentes")
      .sort({ evento: 1 });
    return res.status(200).json(allEventos);
  } catch (error) {
    return res.status(400).json({ error: 'No se han podido obtener los eventos' });
  }
};

const getAllEventosByAssistants = async (req, res, next) => {
  try {
    const allEventos = await Evento.find().populate("asistentes");
    const sortedEventos = allEventos.sort((a, b) => b.asistentes.length - a.asistentes.length);

    return res.status(200).json(sortedEventos);
  } catch (error) {
    return res.status(400).json({ error: 'No se han podido obtener los eventos' });
  }
};

const getAllEventosByDate = async (req, res, next) => {
  try {
    const allEventos = await Evento.find()
      .populate("asistentes")
      .sort({ fecha: 1 });
    return res.status(200).json(allEventos);
  } catch (error) {
    return res.status(400).json({ error: 'No se han podido obtener los eventos' });
  }
};


const postEvento = async (req, res, next) => {
  try {
    const newEvento = new Evento(req.body)
    const eventoDuplicado = await Evento.findOne({
      evento: req.body.evento
    })
    if (eventoDuplicado) {
      return res.status(409).json('Ese evento ya esta añadido.')
    }
    if (req.file) {
      newEvento.cartel = req.file.path
    }
    
    const guardarEvento = await newEvento.save()
    res.status(201).json(guardarEvento)
  } catch (error) {
    return res.status(400).json('Algo ha fallado al añadir el evento')
  }
}

const updateEvento = async (req, res, next) => {
  try {
    const { id } = req.params
    const oldEvento = await Evento.findById(id)
    if (!oldEvento) {
      deleteFile(req.file.path)
       return res.status(404).json("evento no encontrado");
     }
    if (req.file){
      deleteFile(oldEvento.cartel)
      req.body.cartel= req.file.path
    }
    if (req.body.asistentes){
      const oldAsistentes = oldEvento.asistentes
      const newAsistentes = req.body.asistentes
      const oldAsistentesString = oldAsistentes.map((asistente) => asistente.toString())
      const newAsistentesString = newAsistentes.map((asistente) => asistente.toString())
      
      const asistentesActualizados = [...new Set([...oldAsistentesString, ...newAsistentesString])]
      req.body.asistentes= asistentesActualizados
    }

    const up = await Evento.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    )
    return res.status(200).json(up)
  } catch (error) {
    return res.status(400).json('Algo ha fallado')
  }
}

const removeUsuarioEvento = async (req, res, next) => {
  try {
    const { id } = req.params
    const oldEvento = await Evento.findById(id)
    const asistentesActuales = oldEvento.asistentes
    const asistenteDeleted = req.body.asistentes
    const asistentesActualizados = asistentesActuales.filter(
      (asistente) => asistente.toString() !== asistenteDeleted.toString()
    )
    req.body.asistentes = asistentesActualizados
    const up = await Evento.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    )
    return res.status(200).json(up)
  } catch (error) {
    return res.status(400).json("Error al eliminar el usuario")
  }
}


const deleteEvento = async (req, res, next) => {
  try {
    const { id } = req.params
    const eventoDeleted = await Evento.findByIdAndDelete(id)
    deleteFile(eventoDeleted.cartel)
    return res.status(200).json(eventoDeleted)
  } catch (error) {
    return res.status(400).json('Algo ha fallado')
  }
}

module.exports = {
  getAllEventos,
  postEvento,
  updateEvento,
  deleteEvento,
  removeUsuarioEvento,
  getAllEventosByName,
  getAllEventosByDate,
  getAllEventosByAssistants
}
