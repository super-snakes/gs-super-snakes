import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {addtoCart} from '../store/cart'

// TO DO
// Handle the add to cart --> redux thing

const ProductCard = props => {
  const {id, title, author, rating, imageUrl} = props.book

  const price = (props.book.price / 100).toFixed(2)
  const salePercentageOff = props.book.salePercentageOff / 100
  return (
    <div className="productCard">
      <Link to={`/products/${id}`}> To single product</Link>
      <h2>{title}</h2>
      <h3>{author}</h3>
      <img src={imageUrl} />
      <p className="rating">{rating}</p>
      {salePercentageOff > 0 ? (
        <p>
          <p style={{textDecorationLine: 'line-through'}}>
            ${price.toFixed(2)}{' '}
          </p>
          ${(price - price * salePercentageOff).toFixed(2)}
        </p>
      ) : (
        <p>${price.toFixed(2)}</p>
      )}

      <button>Add to Cart</button>

    </div>
  )
}

const mapDispatch = dispatch => {
  return {
    addToCart: itemId => dispatch(addtoCart(itemId))
  }
}

export default connect(null, mapDispatch)(ProductCard)
