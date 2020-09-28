// const Community = require('../models/communitySchema')

// async function communityMessage (req, res) {
//   try {
//     req.body.user = req.currentUser
//     const createdMessage = await Community.create(req.body)
//     res.status(201).json(createdMessage)
//   } catch (err) {
//     res.json(err)
//   }
// }


// module.exports = {
//   create: communityMessage
// }