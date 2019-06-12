const router = require('express').Router()
const {User, Product, Order} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.getUserCurrentOrder(id)
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.getUserOrderHistory(id)
    res.json(orders)
  } catch (err) {
    next(err)
  }
})
