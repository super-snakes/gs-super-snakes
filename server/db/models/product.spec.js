const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('setSaleStatus', () => {
      let harryPotter

      beforeEach(async () => {
        harryPotter = await Product.create({
          title: 'Chamber of Secrets',
          author: 'JK Rowling'
        })
      })

      it('sets salePercentageOff of individual product equal to number provided', () => {
        expect(harryPotter.setSaleStatus(0.2)).to.equal(0.2)
      })
      it('only takes a decimal value between zero and one', () => {
        expect(harryPotter.setSaleStatus(5)).to.equal('invalid')
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
