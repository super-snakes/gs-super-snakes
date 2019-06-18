import React from 'react'
import {connect} from 'react-redux'
import ProductCard from './ProductCard'
import {getProducts} from '../store/products'
import GridList from '@material-ui/core/GridList'
import AdminFormToggle from './adminFormToggle'

class Products extends React.Component {
  componentDidMount() {
    this.props.getBooks()
  }

  render() {
    const books = this.props.products
    return (
      <div id="all-products-wrapper">
        {this.props.user.isAdmin ? <AdminFormToggle /> : false}
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
  products: state.products,
  user: state.user
})

export default connect(mapStateToProps, mapToDispatch)(Products)
