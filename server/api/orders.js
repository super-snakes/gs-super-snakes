const router = require('express').Router()
const {Order, Product, OrderProducts, User} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const {isAdmin} = require('./isAdmin')
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
    if (openOrder[0].orderId) {
      openOrder[0].orderId.forEach(book => {
        cartToSend[book.id] = {
          quantity: book.orderProducts.quantity,
          book: book
        }
      })
      openOrder[0].destroy()
    }
    res.json(cartToSend)
  } catch (err) {
    next(err)
  }
})

router.get('/cart/orderHistory/:id', async (req, res, next) => {
  try {
    const orderHistory = await Order.findAll({
      where: {
        userId: +req.params.id,
        status: {
          [Op.not]: 'pending'
        }
      },
      include: [{model: Product, as: 'orderId'}]
    })

    let returnOrders = []

    for (let i = 0; i < orderHistory.length; i++) {
      let order = []
      let books = orderHistory[i].orderId
      for (let j = 0; j < books.length; j++) {
        const book = books[j]
        const id = book.id
        const title = book.title
        const author = book.author
        const imageUrl = book.imageUrl
        const description = book.description
        const price = book.orderProducts.price
        const quantity = book.orderProducts.quantity
        order.push({id, title, author, imageUrl, description, price, quantity})
      }
      returnOrders.push(order)
    }
    res.json(returnOrders)
  } catch (error) {
    next(error)
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

router.put('/cart/:id', isAdmin, async (req, res, next) => {
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

router.delete('/:id', isAdmin, async (req, res, next) => {
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
