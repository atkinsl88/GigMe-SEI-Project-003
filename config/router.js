const router = require('express').Router()
const events = require('../controllers/events')
const auth = require('../controllers/auth')
const secureRoute = require('../lib/secureRoute')
// const community = require('../controllers/community')
const user = require('../controllers/users')


router.route('/events')
  .get(events.index)
  .post(secureRoute, events.create)

router.route('/events/:id')
  .get(events.show)
  .put(secureRoute, events.edit)
  .delete(secureRoute, events.delete)

router.route('/events/:id/comments')
  .post(secureRoute, events.commentCreate)

router.route('/events/:id/comments/:commentId')
  .delete(secureRoute, events.commentDelete)

router.route('/events/:id/like')
  .post(secureRoute, events.eventsLike)

// router.route('/community')
//   .post(secureRoute, community.create)

router.route('/register')
  .post(auth.register)

router.route('/login')
  .post(auth.login)

router.route('/users/')
  .get(user.usersall)

router.route('/users/:id')
  .get(user.userSpecific)

router.route('/profiles/:id')
  .get(secureRoute, user.profile)

module.exports = router