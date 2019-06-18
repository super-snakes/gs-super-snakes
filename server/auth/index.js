const router = require('express').Router()
const User = require('../db/models/user')
module.exports = router

const userNotFound = next => {
  const err = new Error('User not found')
  err.status = 404
  next(err)
}

router.post('/login', async (req, res, next) => {
  try {
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user.correctPassword(req.body.password)) {
        req.session.userId = user.id
        res.json(user)
      } else {
        const err = new Error('Incorrect email or password')
        err.status = 401
        next(err)
      }
    })
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  const {email, password} = req.body
  try {
    let user = await User.findOne({
      where: {
        email: email
      }
    })
    if (user) {
      return res.status(400).json({msg: 'User already exists'})
    }
    user = await User.create({
      email,
      password
    })
    if (!req.session.userId) {
      req.session.userId = user.id
    }
    res.json(user)
  } catch (err) {
    console.error(err)
    return res.status(500).send('Server error')
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res, next) => {
  if (!req.session.userId) {
    userNotFound(next)
  } else {
    User.findByPk(req.session.userId)
      .then(user => (user ? res.json(user) : userNotFound(next)))
      .catch(next)
  }
})

router.use('/google', require('./google'))
