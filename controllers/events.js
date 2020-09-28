const Event = require('../models/eventSchema')
const { notFound, unauthorized } = require('../lib/errorMessages')

async function eventsIndex (req, res, next) {
  try {
    const events = await Event.find().populate('user')
    if (!events) throw new Error(notFound)
    res.status(200).json(events)
  } catch (err) {
    next(err)
  }
}

async function eventsShow (req, res, next) {
  try {
    const events = await Event.findById(req.params.id).populate('user').populate('comments.user')
    if (!events) throw new Error(notFound)
    res.status(200).json(events)
  } catch (err) {
    next(err)
  }
}

async function eventsCreate (req, res, next) {
  try {
    req.body.user = req.currentUser
    const createdEvents = await Event.create(req.body)
    res.status(201).json(createdEvents)
  } catch (err) {
    next(err)
  }
}

async function eventsEdit (req, res, next) {
  try {
    const editedEvents = await Event.findById(
      req.params.id,
      { new: true, runValidators: true }
    )
    if (!editedEvents) throw new Error(notFound)
    if (!editedEvents.user.equals(req.currentUser._id)) throw new Error(unauthorized)
    Object.assign(editedEvents, req.body)
    await editedEvents.save()
    res.status(202).json(editedEvents)
  } catch (err) {
    next(err)
  }
}

async function eventsDelete (req, res, next) {
  try {
    const deleteEvent = await Event.findById(req.params.id)
    if (!deleteEvent) throw new Error(notFound)
    if (!deleteEvent.user.equals(req.currentUser._id)) throw new Error(unauthorized)
    await deleteEvent.remove()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

async function eventsCommentCreate (req, res, next) {
  try {
    const event = await Event.findById(req.params.id)
    if (!event) throw new Error(notFound)
    const commentBody = req.body 
    commentBody.user = req.currentUser._id
    event.comments.push(commentBody)
    await event.save()
    res.status(201).json(event)
  } catch (err) {
    next(err)
  }
}

async function eventsCommentDelete (req, res, next) {
  try {
    const event = await Event.findById(req.params.id)
    if (!event) throw new Error(notFound)
    const commentToDelete = event.comments.id(req.params.commentId)
    if (!commentToDelete) throw new Error(notFound)
    if (!commentToDelete.user.equals(req.currentUser._id)) throw new Error(unauthorized)
    await commentToDelete.remove()
    await event.save()
    res.status(202).json(event)
  } catch (err) {
    next(err)
  }
}

async function eventsLike (req, res, next) {
  try {
    const event = await Event.findById(req.params.id)
    if (!event) throw new Error(notFound)
    const likeBody = req.body 
    likeBody.user = req.currentUser._id
    event.likes.push(likeBody)
    await event.save()
    res.status(201).json(event)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  index: eventsIndex,
  show: eventsShow,
  create: eventsCreate,
  edit: eventsEdit,
  delete: eventsDelete,
  commentCreate: eventsCommentCreate,
  commentDelete: eventsCommentDelete,
  eventsLike 
}