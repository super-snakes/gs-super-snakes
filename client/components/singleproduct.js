import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleBookThunk} from '../store/singleproductReducer'
import {Link} from 'react-router-dom'

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      showAddReview: false
    }
    this.toggle_review = this.toggle_review.bind(this)
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
  render() {
    console.log('------->', this)
    let obj = this.props.book

    return (
      <div>
        <img src={this.props.book.imageUrl} height={200} />
        <h3>{obj.title}</h3>
        <h5>by {obj.author}</h5>
        <h3>Genre: {obj.genre}</h3>
        <button>Add to wish list</button>
        <div>
          <form action="/action_page.php">
            <h3>Quantity: {obj.quantity}</h3>

            <input type="number" name="quantity" min="1" max="100" />
            <button>Add to Cart</button>
          </form>
          {obj.salePercentageOff > 0 ? (
            <h3>
              SALE Discount: {obj.salePercentageOff * 100}% Price: ${obj.price -
                obj.salePercentageOff}{' '}
            </h3>
          ) : (
            <h3>
              Price:{obj.price}*{obj.quantity}
            </h3>
          )}
        </div>
        <a href="#Reviews">Reviews</a>
        <div>
          <h4>Book Overview</h4>
          <h6>{obj.description}</h6>
        </div>

        <hr />
        <a name="Reviews">Reviews</a>
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

const mapDispatchToProps = dispatch => ({
  getSingleBook: id => dispatch(getSingleBookThunk(id)),
  addReview: newReview => dispatch(addReviewToBookThunk(newReview))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
