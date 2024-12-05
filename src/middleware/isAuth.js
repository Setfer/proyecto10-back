const { verifyJwt } = require('../utils/jwt')
const Usuario = require('../api/models/usuarios')


const isAuth = async(req,res,next)=>{
  try {
   
    const [, token] = req.headers.authorization.split(' ')
    const { id } = verifyJwt(token)
    const user = await Usuario.findById(id)
    user.password = null
    req.user = user
    next()
  } catch (error) {
    return res.status(401).json('Sin autorizacion')
  }
}


module.exports ={isAuth}