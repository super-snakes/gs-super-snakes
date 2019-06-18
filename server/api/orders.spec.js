const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Order = db.model('order')
const session = require('supertest-session')
const User = db.model('user')

describe('Order routes', () => {
  let testSession
  let authenticatedSession

  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/orders/', () => {
    beforeEach(() => {
      testSession = session(app)
      User.create({email: 'test@test.com', password: 'password', isAdmin: true})
      return Order.bulkCreate([
        {
          status: 'pending'
        },
        {
          status: 'shipped'
        },
        {
          status: 'completed'
        },
        {
          status: 'completed'
        }
      ])
    })

    xit('GET /cart/:id', async () => {
      authenticatedSession = session(app)
      await authenticatedSession
        .post('/auth/login')
        .send({email: 'test@test.com', password: 'password'})
      const res = await authenticatedSession
        .get('/api/orders/cart/1')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.status).to.be.equal('pending')
    })

    xit('PUT /cart/:id', async () => {
      authenticatedSession = session(app)
      authenticatedSession
        .post('/auth/login')
        .send({email: 'test@test.com', password: 'password'})
      const res = await authenticatedSession
        .put('/api/orders/cart/3')
        .send({status: 'shipped'})
        .expect(200)

      const updatedOrder = await Order.findByPk(3)
      expect(updatedOrder.status).to.be.equal('shipped')
    })

    it('POST /cart', async () => {
      authenticatedSession = session(app)
      authenticatedSession
        .post('/auth/login')
        .send({email: 'test@test.com', password: 'password'})
      const res = await authenticatedSession
        .post('/api/orders/cart', {userId: 5, status: 'pending'})
        .expect(201)

      expect(res.body).to.be.an('object')
      expect(res.body.status).to.be.equal('pending')
    })

    xit('DELETE /:id', async () => {
      authenticatedSession = session(app)
      authenticatedSession
        .post('/auth/login')
        .send({email: 'test@test.com', password: 'password'})
      const res = await authenticatedSession.delete('/api/orders/1').expect(200)

      const remainingOrders = await Order.findAll()

      expect(remainingOrders.length).to.be.equal(3)
    })
  })
})
