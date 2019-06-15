const router = require('express').Router()
const {Order, Product, OrderProducts, User} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = router

router.get('/cart/:id', async (req, res, next) => {
  try {
    const openOrder = await Order.findAll({
      where: {
        userId: +req.params.id,
        status: 'pending'
      },
      include: [{model: Product, as: 'orderId'}]
    })
    const cartToSend = {}
    openOrder[0].orderId.forEach(book => {
      cartToSend[book.id] = {quantity: book.orderProducts.quantity, book: book}
    })
    openOrder[0].destroy()
    res.json(cartToSend)
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
    const addressString = address ? Object.values(address).join(' ') : null
    const email = req.body.email
    const newOrder = await Order.create({
      status,
      userId,
      address: addressString,
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

    if (userId !== null && address !== null) {
      User.update(address, {
        where: {
          id: userId
        }
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
