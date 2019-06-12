import React from 'react'
import {connect} from 'react-redux'

const CartView = props => {
  return <div />
}

const mapState = state => {
  return {
    cart: state.cart
  }
}

export default connect(mapState)(CartView)
