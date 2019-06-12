const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
    //do we want to break author's name up and allow for running searches by author's last name?
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://www.google.com/imgres?imgurl=https%3A%2F%2Fdictionary.cambridge.org%2Ffr%2Fimages%2Fthumb%2Fbook_noun_001_01679.jpg%3Fversion%3D4.0.82&imgrefurl=https%3A%2F%2Fdictionary.cambridge.org%2Ffr%2Fdictionnaire%2Fanglais%2Fbook&docid=9mUzIWA1HEO4MM&tbnid=35Su7QK-1hGk1M%3A&vet=10ahUKEwi909yT4-HiAhVP11kKHZ2oDoYQMwivASgoMCg..i&w=200&h=200&bih=686&biw=802&q=book&ved=0ahUKEwi909yT4-HiAhVP11kKHZ2oDoYQMwivASgoMCg&iact=mrc&uact=8'
  },
  description: {
    allowNull: true,
    type: Sequelize.TEXT
  },

  //f n, y a, c,
  tags: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      is: /[fnyac]/
      //isIn: [['Fiction', 'Non-Fiction']]
    }
  },
  //for later, when allowing addition to cart, check quantity value (must be at least 1)
  quantity: {
    type: Sequelize.BIGINT,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  genre: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      isLowercase: true
    }
  },
  //moving promo code out of products page (promotions apply time-sensitive-wise to session)
  featuredItem: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  salePercentageOff: {
    defaultValue: 0,
    type: Sequelize.DECIMAL,
    validate: {
      min: 0.0,
      max: 1.0
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  }
})

Product.prototype.setSaleStatus = function(sale) {
  try {
    if (sale > 1 || sale < 0) {
      return 'invalid'
    } else {
      this.salePercentageOff = sale
      return this.salePercentageOff
    }
  } catch (err) {
    console.log(err)
  }
}

Product.prototype.setFeatureItem = function() {
  try {
    this.featuredItem = !this.featuredItem
  } catch (err) {
    console.log(err)
  }
}

Product.prototype.decreaseQuantityFromPurchase = function(num) {
  try {
    if (num === 0) {
      return 'Item not available.'
    }
    if (num > this.quantity) {
      return `Only ${this.quantity} items remaining in store!`
    }
    this.quantity -= num
  } catch (err) {
    console.log(err)
  }
}

//fun idea: use orders info to allow displaying of top purchases

module.exports = Product
