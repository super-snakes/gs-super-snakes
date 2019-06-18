import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {addToCart} from '../store/cart'
import DeleteIcon from '@material-ui/icons/Delete'
import {deleteProductThunk} from '../store/products'
import IconButton from '@material-ui/core/IconButton'

const ProductCard = props => {
  const {id, title, author, rating, imageUrl} = props.book

  const price = (props.book.price / 100).toFixed(2)
  const salePercentageOff = props.book.salePercentageOff / 100

  return (
    <div className="product-card">
      <div className="product-card-image-wrapper">
        <img src={imageUrl} />
      </div>
      <div className="product-card-content-wrapper">
        <Link className="product-card-content" to={`/products/${id}`}>
          <h2>{title}</h2>
          <h3>by {author}</h3>
          <p className="rating">{rating}</p>
          {salePercentageOff > 0 ? (
            <div className="sale-price-wrapper">
              <p className="sale-price">${price} </p>
              <p className="price">
                ${(price - price * salePercentageOff).toFixed(2)}{' '}
              </p>
            </div>
          ) : (
            <div className="price-wrapper">
              <p className="price">${price}</p>
            </div>
          )}
        </Link>
        <button
          type="button"
          onClick={() => {
            props.addToCart(id, 1)
          }}
          style={{margin: '10px'}}
        >
          Add to my Cart
        </button>
        {props.user.isAdmin ? (
          <IconButton
            aria-label="Delete"
            onClick={() => props.deleteProductAction(id)}
          >
            <DeleteIcon />
          </IconButton>
        ) : (
          false
        )}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user,
  cart: state.cart
})

const mapDispatch = dispatch => {
  return {
    addToCart: (itemId, quantity) => dispatch(addToCart(itemId, quantity)),
    deleteProductAction: id => dispatch(deleteProductThunk(id))
  }
}

export default connect(mapStateToProps, mapDispatch)(ProductCard)
