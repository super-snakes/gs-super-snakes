import React from 'react'
import {connect} from 'react-redux'
import CheckoutForm from './CheckoutForm'
import OrderSummary from './OrderSummary'

const Checkout = props => {
  const cart = props.cart

  return (
    <div id="checkoutWrapper">
      <OrderSummary />
      <CheckoutForm history={props.history} location={props.location} />
    </div>
  )
}

const mapToState = state => ({
  cart: state.cart
})

const mapToDispatch = dispatch => ({})

export default connect(mapToState, mapToDispatch)(Checkout)
