const jwt = require("jsonwebtoken")

const generateToken= (id)=>{
  return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "10w"})
}

const verifyJwt=(token)=>{
  return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports= {generateToken, verifyJwt}