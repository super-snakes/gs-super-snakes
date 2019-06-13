import React from 'react'
import CartItem from './cartItem'
import {connect} from 'react-redux'
import {addToCart, getCart} from '../store/cart'

const CartView = props => {
  return (
    <div>
      {props.cart.map((product, ind) => {
        return <CartItem product={product} keyValue={ind} />
      })}
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
