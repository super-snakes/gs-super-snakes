import React from 'react'
import {connect} from 'react-redux'
import ProductCard from './ProductCard'
import {getProducts} from '../store/products'
import {Link, Switch, Route} from 'react-router-dom'

class Products extends React.Component {
  componentDidMount() {
    this.props.getBooks()
  }

  render() {
    const books = this.props.products
    return (
      <div id="allProductsWrapper">
        {books.map(book => {
          return <ProductCard key={book.id} book={book} />
        })}
      </div>
    )
  }
}

const mapToDispatch = dispatch => ({
  getBooks: () => dispatch(getProducts())
})

const mapStateToProps = state => ({
  products: state.products
})

export default connect(mapStateToProps, mapToDispatch)(Products)
