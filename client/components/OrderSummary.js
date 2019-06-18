import React from 'react'
import {connect} from 'react-redux'
import GridList from '@material-ui/core/GridList'

const OrderSummary = props => {
  const books = Object.values(props.cart)
  const total = books.reduce((acc, el) => {
    const price =
      el.book.price - el.book.price * (el.book.salePercentageOff / 100)
    return acc + price * el.quantity
  }, 0)
  return (
    <div id="orderSummaryWrapper">
      <h2>Order Summary:</h2>
      <GridList
        cellHeight={180}
        style={{padding: '25px'}}
        id="orderItemSummary"
      >
        {books.map(el => {
          const price =
            el.book.price - el.book.price * (el.book.salePercentageOff / 100)
          return (
            <div key={el.book.id} className="checkoutOrderItem">
              <h4>{el.book.title}</h4>
              <p>{el.book.author}</p>
              <p>Price per unit: ${(price / 100).toFixed(2)}</p>
              <p>Quantity: {el.quantity}</p>
              <p>Price: ${(price * el.quantity / 100).toFixed(2)}</p>
            </div>
          )
        })}
      </GridList>
      <h3>Total: ${(total / 100).toFixed(2)}</h3>
    </div>
  )
}

const mapStateToProps = state => ({
  cart: state.cart
})

export default connect(mapStateToProps)(OrderSummary)
