const {expect} = require('chai')
const db = require('../index')
const OrderProducts = db.model('orderProducts')

describe('OrderProducts model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
})
afterEach(() => {
  return db.sync({force: true})
})

describe('instanceMethods', () => {
  describe('price, quantity', () => {
    let OrderProducts1

    beforeEach(async () => {
      OrderProducts1 = await OrderProducts.create({
        price: 400,
        quantity: 2
      })
    })
    it('includes price and quantity', () => {
      expect(OrderProducts1.price).to.equal(400)
      expect(OrderProducts1.quantity).to.equal(2)
    })
  })
})
