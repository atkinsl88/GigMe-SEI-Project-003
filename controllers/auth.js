const User = require('../models/userSchema')
const jwt = require('jsonwebtoken') 
const { secret } = require('../config/environment') 


async function register(req, res, next) {
  try {
    const user = await User.create(req.body)
    res.status(201).json({ message: `Welcome ${user.username}` })
  } catch (err) {
    next(err)
  }
}

async function login (req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email }) 
    if (!user || !user.validatePassword(req.body.password)) {
      throw new Error() 
    } 
    const token = jwt.sign( 
      { sub: user._id }, 
      secret, 
      { expiresIn: '7 days' } 
    )
    res.status(202).json({ 
      message: `Welcome to GigMe ${user.username}`,
      token, 
      id: user.id
    })
  } catch (err) {
    next(err)
  }
}

async function profileIndex (req, res, next) {
  const profiles = await User.find().populate('user')
  res.status(200).json(profiles)
}

async function showProfile (req, res, next) {
  try {
    const profiles = await User.findById(req.params.id).populate('user')
    if (!profiles) throw new Error()
    res.status(200).json(profiles)
  } catch (err) {
    res.json(err)
    console.log(err)
  }
}


module.exports = {
  register,
  login,
  showProfile,
  profileIndex
}