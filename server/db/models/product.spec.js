const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  afterEach(() => {
    return db.sync({force: true})
  })
  describe('instanceMethods', () => {
    describe('setSaleStatus', () => {
      let harryPotter

      beforeEach(async () => {
        harryPotter = await Product.create({
          title: 'Chamber of Secrets',
          author: 'JK Rowling',
          // imageUrl:
          //   'https://www.google.com/imgres?imgurl=https%3A%2F%2Fdictionary.cambridge.org%2Ffr%2Fimages%2Fthumb%2Fbook_noun_001_01679.jpg%3Fversion%3D4.0.82&imgrefurl=https%3A%2F%2Fdictionary.cambridge.org%2Ffr%2Fdictionnaire%2Fanglais%2Fbook&docid=9mUzIWA1HEO4MM&tbnid=35Su7QK-1hGk1M%3A&vet=10ahUKEwi909yT4-HiAhVP11kKHZ2oDoYQMwivASgoMCg..i&w=200&h=200&bih=686&biw=802&q=book&ved=0ahUKEwi909yT4-HiAhVP11kKHZ2oDoYQMwivASgoMCg&iact=mrc&uact=8',
          // description: 'NY',
          // tags: 'f',
          // quantity: 0,
          // genre: 'novel',
          // featuredItem: false,
          // salePercentageOf: 0,
          price: 1
        })
      })

      // it('includes title, author, imageUrl, description, tags, quantity,genre, price,salePercentageOff, featuredItem', () => {
      //   expect(harryPotter.title).to.equal('Chamber of Secrets'),
      //     expect(harryPotter.author).to.equal('JK Rowling'),
      //     expect(harryPotter.imageUrl).to.equal(
      //       'https://www.google.com/imgres?imgurl=https%3A%2F%2Fdictionary.cambridge.org%2Ffr%2Fimages%2Fthumb%2Fbook_noun_001_01679.jpg%3Fversion%3D4.0.82&imgrefurl=https%3A%2F%2Fdictionary.cambridge.org%2Ffr%2Fdictionnaire%2Fanglais%2Fbook&docid=9mUzIWA1HEO4MM&tbnid=35Su7QK-1hGk1M%3A&vet=10ahUKEwi909yT4-HiAhVP11kKHZ2oDoYQMwivASgoMCg..i&w=200&h=200&bih=686&biw=802&q=book&ved=0ahUKEwi909yT4-HiAhVP11kKHZ2oDoYQMwivASgoMCg&iact=mrc&uact=8'
      //     ),
      //     expect(harryPotter.description).to.equal('NY'),
      //     expect(harryPotter.tags).to.equal('f'),
      //     expect(harryPotter.quantity).to.equal('0'),
      //     expect(harryPotter.genre).to.equal('novel'),
      //     expect(harryPotter.featuredItem).to.equal(false),
      //     expect(harryPotter.salePercentageOff).to.equal(0),
      //     expect(harryPotter.price).to.equal(1)
      // })
      it('sets salePercentageOff of individual product equal to number provided', () => {
        expect(harryPotter.setSaleStatus(0.2)).to.equal(0.2)
      })
      it('only takes a decimal value between zero and one', () => {
        expect(harryPotter.setSaleStatus(5)).to.equal('invalid')
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
