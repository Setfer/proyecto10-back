const { deleteFile } = require('../../utils/deleteFile')
const { generateToken } = require('../../utils/jwt')
const Usuario = require('../models/usuarios')
const bcrypt = require('bcrypt')

const register = async (req, res, next) => {
  try {
    const usuario = new Usuario(req.body)
    usuario.admin = false
    const usuarioDuplicado = await Usuario.findOne({ correo: req.body.correo })
    if (usuarioDuplicado) {
      return res.status(409).json('Ya existe un usuario con ese correo')
    }
    if (req.file) {
      usuario.avatar = req.file.path
    }
    const usuarioSaved = await usuario.save()
    return res.status(201).json(usuarioSaved)
  } catch (error) {
    console.log(error)
    return res.status(400).json('Error al registrarse')
  }
}

const login = async (req, res, next) => {
  try {
    const { correo, password } = req.body
    const usuario = await Usuario.findOne({ correo })
    if (!usuario) {
      return res.status(401).json('Nombre de usuario o contraseña incorrectos')
    }

    if (bcrypt.compareSync(password, usuario.password)) {
      const token = generateToken(usuario._id)
      return res
        .status(200)
        .json({ token, id: usuario._id, eventos: usuario.eventos , nombre: usuario.nombre})
    } else {
      return res.status(401).json('Nombre de usuario o contraseña incorrecta')
    }
  } catch (error) {
    return res.status(400).json('Error')
  }
}

const getUsuarios = async (req, res, next) => {
  try {
    const allUsuarios = await Usuario.find().populate('eventos')
    return res.status(200).json(allUsuarios)
  } catch (error) {
    return res.status(400).json('No se ha podido obtener la lista de usuarios')
  }
}

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params
    if (req.user._id.toString() !== id) {
      return res.status(400).json('Solo puedes obtener los datos de tu usuario')
    }
    const user = await Usuario.findById(id).populate('eventos')
    return res.status(200).json(user)
  } catch (error) {
    return res.status(400).json('Error al obtener el usuario')
  }
}

const updateUsusario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oldUsuario = await Usuario.findById(id);


    if (req.user._id.toString() !== id) {
      return res
        .status(400)
        .json('No puedes modificar a alguien que no seas tú mismo');
    }


    if (req.body.correo) {
      const correoExistente = await Usuario.findOne({ correo: req.body.correo });
      if (correoExistente && correoExistente._id.toString() !== id) {
        return res
          .status(409)
          .json('El correo electrónico ya está registrado en la base de datos');
      }
    }

  
    if (req.file) {
      deleteFile(oldUsuario.avatar);
      req.body.avatar = req.file.path;
    }

   
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }


    if (req.body.eventos) {
      const oldEventos = oldUsuario.eventos;
      const newEventos = req.body.eventos;

      const oldEventosString = oldEventos.map((evento) => evento.toString());
      const newEventosString = newEventos.map((evento) => evento.toString());

      const eventosActualizados = [
        ...new Set([...oldEventosString, ...newEventosString])
      ];
      req.body.eventos = eventosActualizados;
    }


    const up = await Usuario.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    return res.status(200).json(up);

  } catch (error) {
    return res.status(400).json('Error al modificar el usuario');
  }
};


const removeEventoUsuario = async (req, res, next) => {
  try {
    const { id } = req.params
    const oldUsuario = await Usuario.findById(id)
    const eventosActuales = oldUsuario.eventos
    const eventoDeleted = req.body.eventos
    const eventosActualizados = eventosActuales.filter(
      (evento) => evento.toString() !== eventoDeleted.toString()
    )
    req.body.eventos = eventosActualizados
    const up = await Usuario.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    )
    return res.status(200).json(up)
  } catch (error) {
    return res.status(400).json("Error al eliminar el evento")
  }
}

const deleteUsuario = async (req, res, next) => {
  try {
    const { id } = req.params
    const usuarioDeleted = await Usuario.findByIdAndDelete(id)
    deleteFile(usuarioDeleted.avatar)
    return res.status(200).json(usuarioDeleted)
  } catch (error) {
    return res.status(400).json('Algo ha fallado')
  }
}
module.exports = {
  register,
  login,
  getUsuarios,
  updateUsusario,
  deleteUsuario,
  getUserById,
  removeEventoUsuario
}
