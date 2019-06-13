const router = require('express').Router()
const {Order, Product} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = router

//retrieve cart (pending order)

router.get('/cart/:id', async (req, res, next) => {
  try {
    const openOrder = await Order.findAll({
      where: {
        id: +req.params.id,
        status: 'pending'
      }
    })
    res.json(openOrder[0])
  } catch (err) {
    next(err)
  }
})

router.post('/cart', async (req, res, next) => {
  try {
    const cart = req.body.cart
    const newOrder = await Order.create({
      status: req.body.status,
      userId: req.body.userId
    })
    // console.log("order", newOrder)
    console.log('cart', cart)
    newOrder.addProducts([1, 2, 3])
    res.status(201).json(newOrder)
  } catch (err) {
    next(err)
  }
})

router.put('/cart/:id', async (req, res, next) => {
  try {
    console.log('here', req.body)
    await Order.update(req.body, {
      where: {
        id: +req.params.id
      }
    })
    res.sendStatus(200)
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
