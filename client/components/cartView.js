import React from 'react'
import {connect} from 'react-redux'

const CartView = props => {
  console.log('>>> ', props)
  return <h1>TEST</h1>
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

export default connect(mapStateToProps)(CartView)
