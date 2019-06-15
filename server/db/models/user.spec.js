/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          name: 'cody',
          email: 'cody@puppybook.com',
          password: 'bones',
          address: '5 Hanover square',
          phoneNumber: '347-999-1111'
        })
      })

      it('includes name, email, password', () => {
        expect(cody.name).to.equal('cody')
        expect(cody.email).to.equal('cody@puppybook.com')
        expect(cody.password).to.equal('bones')
      })

      it('sets default values on "isAdmin"', () => {
        expect(cody.isAdmin).to.equal(false)
      })

      it('"paymentType" only takes "paypal", "stripe" or "credit card"', async () => {
        let result, error
        try {
          newUser = await User.create({
            name: 'cody',
            email: 'cody@puppybook.com',
            password: 'bones',
            address: '5 Hanover square',
            phoneNumber: '347-999-1111',
            paymentType: 'cash'
          })
        } catch (err) {
          error = err
        }
        expect(error).to.be.an.instanceOf(Error)
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
