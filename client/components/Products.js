import React from 'react'
import {connect} from 'react-redux'
import ProductCard from './ProductCard'

class Products extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    const {products} = this.props
    return (
      <div id="allProductsWrapper">
        {products.map(book => {
          return <ProductCard key={book.id} props={book} />
        })}
      </div>
    )
  }
}

// getProducts thunk
