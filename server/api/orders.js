const router = require('express').Router()
const {Order, Product, OrderProducts} = require('../db/models')
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
    const status = req.body.status
    const userId = req.body.userId
    const address = req.body.address
    const email = req.body.email
    const newOrder = await Order.create({
      status,
      userId,
      address,
      email
    })

    for (let bookId in cart) {
      await OrderProducts.create({
        orderId: newOrder.id,
        productId: cart[bookId].book.id,
        quantity: cart[bookId].quantity,
        price: cart[bookId].book.price
      })
    }

    res.status(201).json(newOrder)
  } catch (err) {
    next(err)
  }
})

router.put('/cart/:id', async (req, res, next) => {
  try {
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
