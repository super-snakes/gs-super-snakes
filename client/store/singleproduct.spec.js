// import * as singleProduct from './singleproductReducer'
const chaiThings = require('chai-things')
const chaiSpies = require('chai-spies')
const sinon = require('sinon')

const chai = require('chai')
chai.use(chaiThings)
chai.use(chaiSpies)
const expect = chai.expect
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)
const store = mockStore(initialState)
const initialState = {
  book: {}
}
import {GOT_SINGLE_BOOK} from './singleproductReducer'
import {gotSingleBook} from './singleproductReducer'
describe('redux store', () => {
  describe('actions', () => {
    const book = {
      id: 1,
      title: 'Book1',
      author: 'author1',
      imageUrl: 'imageUrl',
      description: 'Description1',
      tags: 'f',
      quantity: 8,
      genre: 'novel',
      featuredItem: false,
      salePercentageOff: 20,
      price: 4000
    }

    let mock
    before(() => {
      mock = new MockAdapter(axios)
    })

    afterEach(() => {
      mock.reset()
    })

    after(() => {
      mock.restore()
    })

    describe('`gotSingleBook`', () => {
      xit('creates an GOT_SINGLE_BOOK action', () => {
        const gotSingleBookAction = gotSingleBook(book)
        expect(gotSingleBookAction.type).to.equal(GOT_SINGLE_BOOK)
        expect(gotSingleBookAction.book).to.eql(book)
      })
    })
  })
})
