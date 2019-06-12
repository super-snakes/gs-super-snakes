import React from 'react'

// TO DO
// Handle the click --> card to single view
// Handle the add to cart --> redux thing

const ProductCard = props => {
  const {title, author, rating, price, imageUrl, addToCart, handleClick} = props
  return (
    <div className="productCard">
      <h2>{title}</h2>
      <h3>{author}</h3>
      <image src={imageUrl} />
      <p className="rating">{rating}</p>
      <p>{price}</p>
      <button handleClick={handleClick}>Add to Cart</button>
    </div>
  )
}

export default ProductCard
