import React, {Component} from 'react'
import {addToCart, modifyCart} from '../store/cart'
import {connect} from 'react-redux'
import {getSingleBookThunk} from '../store/singleproductReducer'
import {Link} from 'react-router-dom'
import UpdateBookForm from '../components/updateBookForm'
import {updateProductThunk} from '../store/singleproductReducer'

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      showAddReview: false,
      showUpdateProduct: false,
      quantity: '0'
    }
    this.toggle_review = this.toggle_review.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.modifyCart = this.modifyCart.bind(this)
    this.addToCart = this.addToCart.bind(this)
    this.toggle_update_product = this.toggle_update_product.bind(this)
    this.updateProductAction = this.updateProductAction.bind(this)
  }

  componentDidMount() {
    this.props.getSingleBook(this.props.match.params.id)
  }

  addReviewToBook(newReview) {
    this.props.addReviewToBook(newReview)
  }

  addToCart(id, quantity) {
    this.props.addToCart(id, quantity)
  }

  modifyCart(id, changeAmount) {
    this.props.modifyCart(id, changeAmount)
  }

  toggle_review(event) {
    event.preventDefault()
    this.setState(prevState => ({
      showAddReview: !prevState.showAddReview
    }))
  }
  toggle_update_product(event) {
    event.preventDefault()
    this.setState(prevState => ({
      showUpdateProduct: !prevState.showUpdateProduct
    }))
  }
  handleSubmit(e) {
    e.preventDefault()
    this.props.addToCart(this.props.book.id, +this.state.quantity)
    // this.props.history.push('/')
  }

  updateProductAction(updatedProduct) {
    console.log('UPDATEPRODUCT updated product', updatedProduct)
    console.log('UPDATEPRODUCT id', this.props)
    this.props.updateProductAction(updatedProduct, this.props.match.params.id)
  }

  handleChange(e) {
    this.setState({quantity: e.target.value})
  }

  render() {
    console.log('object', this)
    let obj = this.props.product
    let price = (obj.price / 100).toFixed(2)

    return (
      <div>
        <img src={this.props.product.imageUrl} height={200} />
        <h3>{obj.title}</h3>
        <h5>by {obj.author}</h5>
        <h3>Genre: {obj.genre}</h3>
        {/* <button>Add to wish list</button> */}
        <button onClick={this.toggle_update_product}>Update Product</button>
        {this.state.showUpdateProduct ? (
          <UpdateBookForm updateProductAction={this.updateProductAction} />
        ) : null}
        <div>
          <form onSubmit={this.handleSubmit}>
            <h3>Quantity: {+this.state.quantity}</h3>

            <input
              type="number"
              name="quantity"
              min="1"
              max="100"
              placeholder="1"
              onChange={this.handleChange}
            />
            <button
              type="submit"
              onClick={() => this.state.modifyCart(obj.id, this.state.quantity)}
            >
              Add to Cart
            </button>
          </form>
          {obj.salePercentageOff > 0 ? (
            <h3>
              Original Price: ${price}
              <br />
              Today's Sale: {obj.salePercentageOff}% off
              <br />
              Take it home for only ${(
                price *
                (100 - obj.salePercentageOff) /
                100
              ).toFixed(2)}!
            </h3>
          ) : (
            <h3>Price: ${price}</h3>
          )}
        </div>
        <a href="#Reviews">Reviews</a>
        <div>
          <h4>Book Overview</h4>
          <h6>{obj.description}</h6>
        </div>

        <hr />
        <a name="Reviews">Reviews</a>
        {this.props.product.reviews}
        <button onClick={this.toggle_review}>Write a customer review</button>

        {this.state.addReviewToBook ? (
          <addReviewToBook addReviewToBook={this.addReviewToBook} />
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  product: state.productReducer
})

const mapDispatchToProps = dispatch => {
  return {
    getSingleBook: id => dispatch(getSingleBookThunk(id)),
    addReview: newReview => dispatch(addReviewToBookThunk(newReview)),
    addToCart: (productId, quantity) => {
      return dispatch(addToCart(productId, quantity))
    },
    modifyCart: (id, changeAmount) => {
      return dispatch(modifyCart(id, changeAmount))
    },
    updateProductAction: (product, id) => {
      console.log('we are n mapDispatchToProps product', product)
      console.log('we are n mapDispatchToProps id', id)
      return dispatch(updateProductThunk(product, id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
