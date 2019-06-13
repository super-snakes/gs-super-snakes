const router = require('express').Router()
const {Product} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const book = await Product.create(req.body)
    res.status(201).json(book)
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

router.put('/:id', async (req, res, next) => {
  try {
    await Product.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.sendStatus(200)
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
    console.log('here', req.params.name)
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
