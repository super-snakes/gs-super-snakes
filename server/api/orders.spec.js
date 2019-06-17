const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Order = db.model('order')

xdescribe('Order routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/orders/', () => {
    beforeEach(() => {
      return Order.bulkCreate([
        {
          // userId: 1,
          status: 'pending'
        },
        {
          // userId: 2,
          status: 'shipped'
        },
        {
          // userId: 3,
          status: 'completed'
        },
        {
          // userId: 1,
          status: 'completed'
        }
      ])
    })

    it('GET /cart/:id', async () => {
      const res = await request(app)
        .get('/api/orders/cart/1')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.status).to.be.equal('pending')
    })

    it('PUT /cart/:id', async () => {
      const res = await request(app)
        .put('/api/orders/cart/3')
        .send({status: 'shipped'})
        .expect(200)

      const updatedOrder = await Order.findByPk(3)
      expect(updatedOrder.status).to.be.equal('shipped')
    })

    xit('POST /cart', async () => {
      const res = await request(app)
        .post('/api/orders/cart', {userId: 5, status: 'pending'})
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.status).to.be.equal('pending')
    })

    it('DELETE /:id', async () => {
      const res = await request(app)
        .delete('/api/orders/1')
        .expect(200)

      const remainingOrders = await Order.findAll()

      expect(remainingOrders.length).to.be.equal(3)
    })
  })
})
