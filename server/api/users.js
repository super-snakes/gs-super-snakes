const router = require('express').Router()
const {User, Product, Reviews, Order} = require('../db/models')
const {isAdmin} = require('./isAdmin')
// function isSelfOrAdmin(req, res, next) {
//   if (req.params.id == req.user.id || req.user.isAdmin) return next()
//   res.redirect('/')
// }

// function isAdmin(req, res, next) {
//   if (req.user.isAdmin) return next()
//   res.redirect('/')
// }

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.status(200).json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', isAdmin, async (req, res, next) => {
  const id = +req.params.id
  try {
    const user = await User.findByPk(id, {
      include: [{model: Order, required: false}]
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.post('/add', isAdmin, async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      street,
      apt,
      city,
      state,
      zipCode,
      phoneNumber,
      paymentInformation,
      isAdmin
    } = req.body
    const user = await User.create({
      name,
      email,
      password,
      street,
      apt,
      city,
      state,
      zipCode,
      phoneNumber,
      paymentInformation,
      isAdmin
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', isAdmin, async (req, res, next) => {
  const id = +req.params.id
  try {
    const {
      name,
      email,
      password,
      street,
      apt,
      city,
      state,
      zipCode,
      phoneNumber,
      paymentInformation,
      isAdmin
    } = req.body
    const [numOfAffected, affected] = await User.update(
      {
        name,
        email,
        password,
        street,
        apt,
        city,
        state,
        zipCode,
        phoneNumber,
        paymentInformation,
        isAdmin
      },

      {
        where: {
          id: id
        },
        returning: true,
        plain: true
      }
    )
    res.json(affected)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', isAdmin, async (req, res, next) => {
  const id = +req.params.id
  try {
    await User.destroy({
      where: {
        id: id
      }
    })
    res.status(200).json('Deleted')
  } catch (err) {
    next(err)
  }
})

module.exports = router
