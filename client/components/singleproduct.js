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
        <div style={{display: 'flex'}}>
          <img
            className="imageFixed"
            src={this.props.book.imageUrl}
            height={200}
            style={{padding: '25px'}}
          />
          <div style={{display: 'flex-direction: column'}}>
            <h3>{obj.title}</h3>
            <h5> by {obj.author} </h5>
            {obj.salePercentageOff > 0 ? (
              <h3>
                Original Price: ${price}
                <br />
                Today's Sale: {obj.salePercentageOff}% off
                <br />
                Take it home for only ${(
                  price *
                  (100 - obj.salePercentageOff) /
                  100).toFixed(2)}!
              </h3>
            ) : (
              <h3>Price: ${price}</h3>
            )}

            <div />
            <form onSubmit={this.handleSubmit}>
              <input
                type="number"
                name="quantity"
                min="1"
                max="100"
                placeholder="1"
                onChange={this.handleChange}
              />
              <button type="submit">Add to Cart</button>

              <br />
              <button>Add to wish list</button>
            </form>
          </div>
        </div>
        <div>
          <h3>Genre: {obj.genre}</h3>
          <h4>Book Overview</h4>
          <h6>{obj.description}</h6>
        </div>

        <hr />
        <a href="#Reviews" style={{padding: '8px'}}>
          Reviews
        </a>
        {this.props.book.reviews}
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
