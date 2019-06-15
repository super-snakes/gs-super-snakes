import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {addToCart} from '../store/cart'

const style = {
  margin: '10px',
  width: '250px',
  height: '10px',
  display: 'inline',
  color: 'black',
  font: 'Arial'
}

const style2 = {
  margin: '30px',
  width: '250px',
  height: '10px',
  color: 'blue',
  font: 'Arial'
}

// TO DO
// Handle the add to cart --> redux thing

const ProductCard = props => {
  const {id, title, author, rating, imageUrl} = props.book

  const price = props.book.price / 100
  const salePercentageOff = props.book.salePercentageOff / 100
  return (
    <div className="productCard">
      <Link to={`/products/${id}`}>
        <h2 style={style}>{title}</h2>
        <h3 style={style2}>by {author}</h3>
        <img src={imageUrl} style={{width: '250px', height: '350px'}} />
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
      <button
        type="button"
        onClick={() => props.addToCart(id, 1)}
        style={{margin: '10px'}}
      >
        Add to my Cart
      </button>
    </div>
  )
}

const mapDispatch = dispatch => {
  return {
    addToCart: (itemId, quantity) => dispatch(addToCart(itemId, quantity))
  }
}

export default connect(null, mapDispatch)(ProductCard)
