import React from 'react'
import {Link} from 'react-router-dom'

// TO DO
// Handle the add to cart --> redux thing

const ProductCard = props => {
  const {
    id,
    title,
    author,
    rating,
    price,
    imageUrl,
    salePercentageOff
  } = props.book
  return (
    <div className="productCard">
      <Link to={`/product/${id}`}>
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
      </Link>
      <button>Add to Cart</button>
    </div>
  )
}

export default ProductCard
