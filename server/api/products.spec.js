/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    beforeEach(() => {
      return Product.bulkCreate([
        {title: 'HP and the Stone', author: 'JK', price: 1},
        {title: 'The Giving Tree', author: 'SS', price: 2}
      ])
    })

    it('GET/api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].title).to.be.equal('HP and the Stone')
    })
  })
  describe('/api/products/book/:id', () => {
    beforeEach(() => {
      return Product.bulkCreate([
        {title: 'HP and the Stone', author: 'JK', price: 1},
        {title: 'The Giving Tree', author: 'SS', price: 2}
      ])
    })

    it('GET/api/products/1', async () => {
      const res = await request(app)
        .get('/api/products/1')
        .expect(200)
      expect(res.body.id).to.be.equal(1)
    })
  })

  describe('/api/products/title/:name', () => {
    beforeEach(() => {
      return Product.bulkCreate([
        {title: 'HP and the Stone', author: 'JK', price: 1},
        {title: 'HP and the Loner', author: 'JK', price: 1},
        {title: 'Scary Coding Disasters', author: 'Console Log', price: 1}
      ])
    })

    it('GET/api/products/title/HP', async () => {
      const res = await request(app)
        .get('/api/products/title/HP')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].title).to.be.equal('HP and the Stone')
      expect(res.body.length).to.be.equal(2)
    })
  })
}) // end describe('User routes')
