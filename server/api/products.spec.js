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
        {
          title: 'HP and the Stone',
          author: 'JK',
          price: 1,
          description: 'Its a book'
        },
        {
          title: 'The Giving Tree',
          author: 'SS',
          price: 2,
          description: 'Its a book'
        }
      ])
    })

    it('GET/api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].title).to.be.equal('HP and the Stone')
    })

    xit('POST/api/products', async () => {
      const res = await request(app)
        .post('/api/products')
        .send({
          title: 'Added Book',
          author: 'Test Name',
          price: 100,
          description: 'Its a book'
        })
        .expect(201)

      let allBooks = await Product.findAll()

      expect(res.body).to.be.an('object')
      expect(res.body.title).to.be.equal('Added Book')
      expect(allBooks.length).to.be.equal(3)
    })
  })

  describe('/api/products/book/:id', () => {
    beforeEach(() => {
      return Product.bulkCreate([
        {
          title: 'HP and the Stone',
          author: 'JK',
          price: 1,
          description: 'Its a book'
        },
        {
          title: 'The Giving Tree',
          author: 'SS',
          price: 2,
          description: 'Its a book'
        }
      ])
    })

    it('GET/api/products/:id', async () => {
      const res = await request(app)
        .get('/api/products/1')
        .expect(200)

      expect(res.body.id).to.be.equal(1)
    })

    xit('POST/api/poducts/:id', async () => {
      const res = await request(app)
        .put('/api/products/2')
        .send({price: 47})
        .expect(200)

      const book = await Product.findByPk(2)

      expect(book.price).to.be.equal(47)
    })
  })

  describe('/api/products/title/:name', () => {
    beforeEach(() => {
      return Product.bulkCreate([
        {
          title: 'HP and the Stone',
          author: 'JK',
          price: 1,
          description: 'Its a book'
        },
        {
          title: 'HP and the Loner',
          author: 'JK',
          price: 1,
          description: 'Its a book'
        },
        {
          title: 'Scary Coding Disasters',
          author: 'Console Log',
          price: 1,
          description: 'Its a book'
        }
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

    it('GET/api/products/title/cod', async () => {
      const res = await request(app)
        .get('/api/products/title/Cod')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].title).to.be.equal('Scary Coding Disasters')
      expect(res.body.length).to.be.equal(1)
    })
  })

  describe('/api/products/genre/:category', () => {
    beforeEach(() => {
      return Product.bulkCreate([
        {
          title: 'HP and the Stone',
          author: 'JK',
          price: 1,
          genre: 'fantasy',
          description: 'Its a book'
        },
        {
          title: 'HP and the Loner',
          author: 'JK',
          price: 1,
          genre: 'fantasy',
          description: 'Its a book'
        },
        {
          title: 'Scary Coding Disasters',
          author: 'Console Log',
          price: 1,
          genre: 'history',
          description: 'Its a book'
        }
      ])
    })

    it('GET/api/products/genre/fantasy', async () => {
      const res = await request(app)
        .get('/api/products/genre/fantasy')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].title).to.be.equal('HP and the Stone')
      expect(res.body.length).to.be.equal(2)
    })

    it('GET/api/products/title/history', async () => {
      const res = await request(app)
        .get('/api/products/genre/history')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].title).to.be.equal('Scary Coding Disasters')
      expect(res.body.length).to.be.equal(1)
    })
  })

  describe('/api/products/author/:writer', () => {
    beforeEach(() => {
      return Product.bulkCreate([
        {
          title: 'HP and the Stone',
          author: 'JK',
          price: 1,
          description: 'Its a book'
        },
        {
          title: 'HP and the Loner',
          author: 'JK',
          price: 1,
          description: 'Its a book'
        },
        {
          title: 'Scary Coding Disasters',
          author: 'Console Log',
          price: 1,
          description: 'Its a book'
        }
      ])
    })

    it('GET/api/products/author/JK', async () => {
      const res = await request(app)
        .get('/api/products/author/JK')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].title).to.be.equal('HP and the Stone')
      expect(res.body.length).to.be.equal(2)
    })

    it('GET/api/products/author/Log', async () => {
      const res = await request(app)
        .get('/api/products/author/Log')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].title).to.be.equal('Scary Coding Disasters')
      expect(res.body.length).to.be.equal(1)
    })

    it('GET/api/products/author/mercedes', async () => {
      const res = await request(app)
        .get('/api/products/author/mercedes')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0]).to.be.equal(undefined)
      expect(res.body.length).to.be.equal(0)
    })
  })
})
