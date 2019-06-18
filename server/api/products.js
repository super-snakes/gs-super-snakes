const router = require('express').Router()
const {Product, Reviews} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const {isAdmin} = require('./isAdmin')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.post('/', isAdmin, async (req, res, next) => {
  try {
    const {
      title,
      author,
      imageUrl,
      description,
      tags,
      quantity,
      genre,
      featureItem,
      salePercentageOff,
      price
    } = req.body
    const book = await Product.create({
      title,
      author,
      imageUrl,
      description,
      tags,
      quantity,
      genre,
      featureItem,
      salePercentageOff,
      price
    })
    res.json(book)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', isAdmin, async (req, res, next) => {
  const id = req.params.id
  try {
    Product.destroy({
      where: {
        id: id
      }
    })
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', isAdmin, async (req, res, next) => {
  const id = req.params.id
  try {
    const {
      title,
      author,
      imageUrl,
      description,
      tags,
      quantity,
      genre,
      featureItem,
      salePercentageOff,
      price
    } = req.body
    const [numberRows, arrayProducts] = await Product.update(
      {
        title,
        author,
        imageUrl,
        description,
        tags,
        quantity,
        genre,
        featureItem,
        salePercentageOff,
        price
      },
      {
        where: {
          id: id
        },
        returning: true,
        plain: true
      }
    )
    if (arrayProducts.length === 0) {
      res.status(500).send()
    } else {
      res.status(200).json({products: arrayProducts})
    }
  } catch (err) {
    next(err)
  }
})

router.get('/genre/:category', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {genre: req.params.category}
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/author/:writer', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        author: {
          [Op.like]: '%' + req.params.writer + '%'
        }
      }
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/title/:name', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        title: {
          [Op.like]: '%' + req.params.name + '%'
        }
      }
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

// Once orders is done we can create a route that get the best sellers
// router.get('top/:num') or something like that
