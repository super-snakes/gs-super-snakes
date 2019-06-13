import React from 'react'
import {connect} from 'react-redux'
import CheckoutForm from './CheckoutForm'

const Checkout = props => {
  const cart = props.cart

  return (
    <div id="checkoutWrapper">
      <CheckoutForm />
    </div>
  )
}

// get payment info
// send the cart to the server

const mapToState = state => ({
  cart: state.cart
})

const mapToDispatch = dispatch => ({})

export default connect(mapToState, mapToDispatch)(Checkout)
