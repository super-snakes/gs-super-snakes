import React, {Component} from 'react' //to use jsx
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'

const OrderSubmitted = props => {
  return (
    <div>
      <h1>
        Thank you!<br />
        Your order has been submitted.
      </h1>
    </div>
  )
}

export default OrderSubmitted
