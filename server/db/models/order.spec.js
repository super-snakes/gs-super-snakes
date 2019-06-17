const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('order model', () => {
    let order1
    beforeEach(async () => {
      order1 = await Order.create({
        status: 'shipped',
        email: 'cody@gmail.com',
        address: '111 Hellow World'
      })
    })
    it('includes status, email, address', () => {
      expect(order1.status).to.equal('shipped')
      expect(order1.email).to.equal('cody@gmail.com')
      expect(order1.address).to.equal('111 Hellow World')
    })

    it('"status" only can be "pending", "shipped" or "completed", "returned"', async () => {
      let result, error
      try {
        newOrder = await Order.create({
          status: 'pending',
          email: 'alyona.rodin@gmail.com',
          address: '3135 Broadway'
        })
      } catch (err) {
        error = err
      }
      expect(error).to.be.an.instanceOf(Error)
    })
  })
})
