import React from 'react'
import CartItem from './cartItem'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {addToCart, getCart} from '../store/cart'
import GridList from '@material-ui/core/GridList'

const CartView = props => {
  let bookArray = []
  for (let bookId in props.cart) {
    bookArray.push(props.cart[bookId])
  }
  return (
    <div>
      <Link to="/cart/checkout">
        <h4>To Checkout</h4>
      </Link>
      <div>
        <GridList cellHeight={180} style={{padding: '25px'}}>
          {bookArray.map(el => {
            return (
              <CartItem
                key={el.book.id}
                product={el.book}
                quantity={el.quantity}
              />
            )
          })}
        </GridList>
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    getCart: userId => dispatch(getCart(userId)),
    addToCart: itemId => dispatch(addToCart(itemId))
  }
}

export default connect(mapState, mapDispatch)(CartView)
