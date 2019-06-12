import React from 'react'
import {connect} from 'react-redux'
import {addToCart, getCart} from '../store/cart'

const CartView = props => {
  return (
    <div>
      {props.cart.map(item => {
        return <div>{item.name}</div>
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
