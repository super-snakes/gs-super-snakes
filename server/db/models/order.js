const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  // userId: {
  //   type: Sequelize.INTEGER,
  //   allowNull: true
  // },
  status: {
    type: Sequelize.STRING,
    defaultValue: 'pending',
    validate: {
      isIn: [['pending', 'shipped', 'completed', 'returned']]
    }
  },
  email: {
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.STRING
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
