const mongoose = require('mongoose')
const { dbURI } = require('../config/environment')
const Event = require('../models/eventSchema')
const eventData = require('./data/events')
const User = require('../models/userSchema')
const userData = require('./data/users')

mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  async (err, db) => {
    if (err) { 
      console.log(err)
      return
    }
    try {
      await db.dropDatabase() 
      console.log('Database Dropped 👍')
      const users = await User.create(userData) 
      console.log(`${'🙂'.repeat(users.length)} created`)
      const eventsWithUsers = eventData.map(event => { 
        event.user = users[0]._id
        return event
      })
      const events = await Event.create(eventsWithUsers) 
      console.log(`${events.length} Events created 🥁`)
      await mongoose.connection.close() 
      console.log('Goodbye 👋')
    } catch (err) {
      await mongoose.connection.close()
      console.log(err) 
      return
    }
  })