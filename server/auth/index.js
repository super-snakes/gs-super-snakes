const router = require('express').Router()
const User = require('../db/models/user')
module.exports = router

// router.put('/login', async (req, res, next) => {
//   try {
//     const user = await User.findOne({where: {email: req.body.email}})
//     if (!user) {
//       console.log('No such user found:', req.body.email)
//       res.status(401).send('Incorrect username and/or password')
//     } else if (!user.correctPassword(req.body.password)) {
//       console.log('Wrong password for user:', req.body.email)
//       res.status(401).send('Wrong username and/or password')
//     } else {
//       req.login(user, err => (err ? next(err) : res.json(user)))
//     }
//   } catch (err) {
//     next(err)
//   }
// })

const userNotFound = next => {
  const err = new Error('User not found')
  err.status = 404
  next(err)
}

router.post('/login', async (req, res, next) => {
  try {
    User.findOne({
      where: {
        email: req.body.email,
        password: req.body.password
      }
    }).then(user => {
      if (user) {
        console.log(user)
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

// router.post('/signup', async (req, res, next) => {
//   try {
//     const user = await User.create(req.body)
//     req.login(user, err => (err ? next(err) : res.json(user)))
//   } catch (err) {
//     if (err.name === 'SequelizeUniqueConstraintError') {
//       res.status(401).send('User already exists')
//     } else {
//       next(err)
//     }
//   }
// })

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
