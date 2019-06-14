import React from 'react'
import {connect} from 'react-redux'

const OrderSummary = props => {
  const books = Object.values(props.cart)
  const total = books.reduce((acc, el) => {
    return acc + el.book.price * el.quantity
  }, 0)
  return (
    <div>
      <h2>Order Summary:</h2>
      {books.map(el => {
        return (
          <div key={el.book.id}>
            <h4>{el.book.title}</h4>
            <p>{el.book.author}</p>
            <p>Price per unit: ${(el.book.price / 100).toFixed(2)}</p>
            <p>Quantity: {el.quantity}</p>
            <p>Price: ${(el.book.price * el.quantity / 100).toFixed(2)}</p>
          </div>
        )
      })}
      <h3>Total: ${(total / 100).toFixed(2)}</h3>
    </div>
  )
}

const mapStateToProps = state => ({
  cart: state.cart
})

export default connect(mapStateToProps)(OrderSummary)
