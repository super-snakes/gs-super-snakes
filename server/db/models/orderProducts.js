const Sequelize = require('sequelize')
const db = require('../db')

const OrderProducts = db.define('orderProducts', {
  //  we will not use here other tables id but we will make correct associations
  // orderId: {
  //   type: Sequelize.INTEGER
  // },
  // productId: {
  //   type: Sequelize.INTEGER
  // },
  price: {
    type: Sequelize.INTEGER
  },
  quantity: {
    type: Sequelize.INTEGER
  }
})

module.exports = OrderProducts
