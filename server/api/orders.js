const router = require('express').Router()
const {Order} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = router

//retrieve cart (pending order)

router.get('/cart/:id', async (req, res, next) => {
  try {
    const openOrder = await Order.findAll({
      where: {
        id: req.params.id,
        status: 'pending'
      }
    })
    res.json(openOrder)
  } catch (err) {
    next(err)
  }
})

router.post('/cart', async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body)
    res.status(201).json(newOrder)
  } catch (err) {
    next(err)
  }
})

router.put('/cart/:id', async (req, res, next) => {
  try {
    let order = await Order.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(order)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await Order.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json('Deleted')
  } catch (err) {
    next(err)
  }
})
