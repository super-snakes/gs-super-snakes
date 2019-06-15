import React, {Component} from 'react'
import {addToCart} from '../store/cart'
import {connect} from 'react-redux'
import {getSingleBookThunk} from '../store/singleproductReducer'
import {Link} from 'react-router-dom'

class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showAddReview: false,
      quantity: ''
    }
    this.toggle_review = this.toggle_review.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.getSingleBook(this.props.match.params.id)
  }

  addReviewToBook(newReview) {
    this.props.addReviewToBook(newReview)
  }

  toggle_review(event) {
    event.preventDefault()
    this.setState(prevState => ({
      showAddReview: !prevState.showAddReview
    }))
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.addToCart(this.props.book.id, +this.state.quantity)
    this.props.history.push('/')
  }

  handleChange(e) {
    this.setState({quantity: e.target.value})
  }

  render() {
    let obj = this.props.book
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
                  100
                ).toFixed(2)}!
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
  book: state.productReducer
})

const mapDispatchToProps = dispatch => {
  return {
    getSingleBook: id => dispatch(getSingleBookThunk(id)),
    addReview: newReview => dispatch(addReviewToBookThunk(newReview)),
    addToCart: (productId, quantity) => {
      return dispatch(addToCart(productId, quantity))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
