const router = require('express').Router()
const {User, Product, Order} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (err) {
    next(err)
  }
})
router.get('/:id', async (req, res, next) => {
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

router.post('/add', async (req, res, next) => {
  console.log(req.body)
  try {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const address = req.body.address
    const phoneNumber = req.body.phoneNumber
    const paymentType = req.body.paymentType
    const paymentInformation = req.body.paymentInformation
    const user = await User.create({
      name,
      email,
      password,
      address,
      phoneNumber,
      paymentType,
      paymentInformation
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  const id = +req.params.id
  try {
    const [numOfAffected, affected] = await User.update(req.body, {
      where: {
        id: id
      },
      returning: true,
      plain: true
    })
    res.json(affected)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
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
