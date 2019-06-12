import React from 'react'
import {Link} from 'react-router-dom'

// TO DO
// Handle the add to cart --> redux thing

const ProductCard = props => {
  const {id, title, author, rating, price, imageUrl} = props.book
  return (
    <div className="productCard">
      <Link to={`/product/${id}`}>
        <h2>{title}</h2>
        <h3>{author}</h3>
        <img src={imageUrl} />
        <p className="rating">{rating}</p>
        <p>${price}</p>
      </Link>
      <button>Add to Cart</button>
    </div>
  )
}

export default ProductCard
