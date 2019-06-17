import React from 'react'
import {connect} from 'react-redux'
import CheckoutForm from './CheckoutForm'
import OrderSummary from './OrderSummary'
import StripeCheckoutComponent from './StripeCheckoutComponent'

const Checkout = props => {
  const cart = props.cart

  return (
    <div id="checkoutWrapper">
      <OrderSummary />
      <StripeCheckoutComponent />
      {/* <CheckoutForm /> */}
    </div>
  )
}

const mapToState = state => ({
  cart: state.cart
})

const mapToDispatch = dispatch => ({})

export default connect(mapToState, mapToDispatch)(Checkout)
