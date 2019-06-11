const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  items: {
    type: Sequelize.ARRAY(Sequelize.ARRAY),
    validate: {
      checkLength(value) {
        if (value.length !== 2) {
          throw new Error('Must provide a product id and current price')
        }
      }
    }
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: 'pending',
    validate: {
      isIn: [['pending', 'shipped', 'completed', 'returned']]
    }
  }
})

module.exports = Order

Order.getUserCurrentOrder = userId => {
  return Order.findOne({
    where: {
      userId: userId,
      status: 'pending'
    }
  })
}

Order.getUserOrderHistory = userId => {
  return Order.findAll({
    where: {
      userId: userId,
      status: {$not: 'pending'}
    }
  })
}
