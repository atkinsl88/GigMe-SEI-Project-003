const User = require('../models/userSchema')
const { notFound } = require('../lib/errorMessages')

async function userProfile(req, res, next) {
  try {
    const user = await User.findById(req.currentUser._id).populate('createdEvents') 
    if (!user) throw new Error(notFound) 
    res.status(200).json(user) 
  } catch (err) {
    next(err) 
  }
}


async function usersIndex(req, res, next) {
  try {
    const usersall = await User.find().populate('user')
    if (!usersall) throw new Error(notFound)
    res.status(200).json(usersall)
  } catch (err) {
    next(err)
  }
}

async function usersFind(req, res, next) {
  try {
    const userSpecific = await User.findById(req.params.id).populate('user')
    if (!userSpecific) throw new Error(notFound)
    res.status(200).json(userSpecific)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  profile: userProfile ,
  usersall: usersIndex,
  userSpecific: usersFind
}