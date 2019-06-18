import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addToCart, modifyCart} from '../store/cart'
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
      quantity: '1'
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
    this.props.addToCart(this.props.product.id, +this.state.quantity)
  }

  updateProductAction(updatedProduct) {
    this.props.updateProductAction(updatedProduct, this.props.match.params.id)
  }

  handleChange(e) {
    this.setState({quantity: e.target.value})
  }

  render() {
    let obj = this.props.product
    let price = (obj.price / 100).toFixed(2)

    return (
      <div id="single-product-wrapper">
        <div id="single-product-content-wrapper">
          <img id="single-product-image" src={this.props.product.imageUrl} />
          <div id="single-product-content">
            <h3>{obj.title}</h3>
            <h4> by {obj.author} </h4>
            {obj.salePercentageOff > 0 ? (
              <h5 id="single-produce-sale">
                Original Price: ${price}
                <br />
                Today's Sale: {obj.salePercentageOff}% off
                <br />
                Take it home for only ${(
                  price *
                  (100 - obj.salePercentageOff) /
                  100
                ).toFixed(2)}!
              </h5>
            ) : (
              <h5>Price: ${price}</h5>
            )}
            {this.props.user.isAdmin ? (
              <button onClick={this.toggle_update_product}>
                Update Product
              </button>
            ) : (
              false
            )}

            {this.state.showUpdateProduct ? (
              <UpdateBookForm updateProductAction={this.updateProductAction} />
            ) : null}

            <div />
            <form onSubmit={this.handleSubmit}>
              <input
                type="number"
                name="quantity"
                min="1"
                max="100"
                value={this.state.quantity}
                onChange={this.handleChange}
              />
              <button type="submit">Add to Cart</button>

              <br />
              <button>Add to wish list</button>
            </form>
          </div>
        </div>
        <div id="single-product-more-info">
          <h3>Genre: {obj.genre}</h3>
          <h3>Book Overview:</h3>
          <p>{obj.description}</p>
        </div>
        <hr />
        <a href="#Reviews">
          <h3 id="reviews">Reviews:</h3>
        </a>
        {this.props.product.reviews}
        <button onClick={this.toggle_review}>Add Review</button>

        {this.state.addReviewToBook ? (
          <addReviewToBook addReviewToBook={this.addReviewToBook} />
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  product: state.productReducer,
  user: state.user
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
      return dispatch(updateProductThunk(product, id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
