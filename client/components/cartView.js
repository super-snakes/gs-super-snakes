import React from 'react'
import {connect} from 'react-redux'

const CartView = props => {
  return <h1>Hello world</h1>
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

export default connect(mapStateToProps)(CartView)
