const Sequelize = require('sequelize')
const db = require('../db')

const Reviews = db.define('reviews', {
  content: {
    type: Sequelize.TEXT
  }
})

module.exports = Reviews
