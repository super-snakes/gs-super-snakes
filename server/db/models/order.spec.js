const {expect} = require('chai')
const db = require('../index')
const Order = db.model('user')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
})
afterEach(() => {
  return db.sync({force: true})
})

describe('instanceMethods', () => {
  describe('correctStatus, email, address', () => {
    let Order1

    beforeEach(async () => {
      Order1 = await Order.create({
        status: 'shipped',
        email: 'cody@puppybook.com',
        address: '5 Hanover square'
      })
    })
    it('type only "pending", "shippied", "completed","returned"', async () => {
      let result, error
      try {
        newOrder = await Order.create({
          status: 'deleted',
          email: 'cody@puppybook.com',
          address: '5 Hanover square'
        })
      } catch (err) {
        error = err
      }
      expect(error).to.be.an.instanceOf(Error)
    })
  })
})
