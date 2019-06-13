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
      <Link to={`/product/${id}`}>
        <h2>{title}</h2>
        <h3>{author}</h3>
        <img src={imageUrl} />
        <p className="rating">{rating}</p>
        {salePercentageOff > 0 ? (
          <div className="salePrice">
            <p style={{textDecorationLine: 'line-through'}}>${price} </p>
            ${(price - price * salePercentageOff).toFixed(2)}
          </div>
        ) : (
          <div className="price">${price}</div>
        )}
      </Link>
      <button type="button" onClick={() => props.addToCart(id)}>
        Add to my Cart
      </button>
    </div>
  )
}

const mapDispatch = dispatch => {
  return {
    addToCart: itemId => dispatch(addtoCart(itemId))
  }
}

export default connect(null, mapDispatch)(ProductCard)
