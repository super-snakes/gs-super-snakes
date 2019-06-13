/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ProductCard from './ProductCard'

const adapter = new Adapter()
enzyme.configure({adapter})

xdescribe('ProductCard', () => {
  let productCard

  beforeEach(() => {
    let book = {
      id: 1,
      title: 'Test Title',
      author: 'Me',
      rating: '5',
      price: '500'
    }
    productCard = shallow(<ProductCard book={book} />)
  })

  it('renders the title in an h2', () => {
    expect(productCard.find('h2').text()).to.be.equal('Test Title')
  })
})
