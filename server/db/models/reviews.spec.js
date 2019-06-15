const {expect} = require('chai')
const db = require('../index')
const Review = require('../models/reviews')

describe('Review Model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
})
afterEach(() => {
  return db.sync({force: true})
})

describe('Write review', () => {
  it('will add a review and return the new object', async () => {
    Review.create({
      content: 'Interesting'
    })
      .then(review => {
        expect(review.get('content')).to.equal('Interesting')
      })
      .catch(err => {
        done(err)
      })
  })
})
