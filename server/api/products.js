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

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    res.json(product)
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
          [Op.substring]: req.params.writer
        }
      }
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

//Below, get request serving 'fuzzy matches' with something searched for.

// router.get('/title/:name', async (req, res, next) => {
//   try {
//     const products = await Product.findAll({
//       where: {
//         title: {
//           [Op.like]: req.params.name
//         }
//       }
//     })
//     res.json(products)
//   } catch (err) {
//     next(err)
//   }
// })
