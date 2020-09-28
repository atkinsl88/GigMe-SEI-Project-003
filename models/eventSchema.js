const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true, maxlength: 300 },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})

const likeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  text: { type: String }
})

const eventSchema = new mongoose.Schema({
  artistName: { type: String }, 
  venue: { type: String, required: true },
  venueAddress: { type: String, required: true },
  genre: { type: String }, 
  date: { type: String, required: true }, 
  doorsAt: { type: Number, required: true }, 
  hasBar: { type: Boolean, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number} , 
  posterImage: { type: String, required: true }, 
  eventPrice: { type: String },
  aboutEvent: { type: String },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  comments: [commentSchema], 
  likes: [likeSchema]
} , {
  timestamps: true
})

eventSchema.plugin(require('mongoose-unique-validator'))

module.exports =  mongoose.model('Event', eventSchema)
