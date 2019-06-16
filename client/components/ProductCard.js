import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {addToCart} from '../store/cart'
import DeleteIcon from '@material-ui/icons/Delete'
import {deleteProductThunk} from '../store/products'
import IconButton from '@material-ui/core/IconButton'

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

  const price = (props.book.price / 100).toFixed(2)
  const salePercentageOff = props.book.salePercentageOff / 100

  console.log('i am in the productcard', props)
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
  )
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatch = dispatch => {
  return {
    addToCart: (itemId, quantity) => dispatch(addToCart(itemId, quantity)),
    deleteProductAction: id => dispatch(deleteProductThunk(id))
  }
}

export default connect(mapStateToProps, mapDispatch)(ProductCard)
