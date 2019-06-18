import React from 'react'
import {connect} from 'react-redux'
import {getOrders} from '../store/orderHistory'

class OrderHistory extends React.Component {
  componentDidMount() {
    this.props.getPastOrders(this.props.user.id)
  }

  render() {
    const orders = this.props.orderHistory
    return (
      <div id="order-history-wrapper">
        <h1>Past Orders:</h1>
        {orders.length ? (
          orders.map((order, index) => {
            let total = 0
            return (
              <div key={index} className="order-wrapper">
                <h2>Order #{index + 1}:</h2>
                {order.map(product => {
                  total += product.price * product.quantity
                  return (
                    <div key={product.id} className="order-product-wrapper">
                      <h3>{product.title}</h3>
                      <h4>{product.author}</h4>
                      <p>
                        {product.quantity} at ${(product.price / 100).toFixed(
                          2
                        )}
                      </p>
                    </div>
                  )
                })}
                <p>Total: ${(total / 100).toFixed(2)}</p>
              </div>
            )
          })
        ) : (
          <p>No past orders.</p>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  orderHistory: state.orderHistory
})

const mapDispatchToProps = dispatch => ({
  getPastOrders: id => dispatch(getOrders(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
