import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome, CartView} from './components'
import {me} from './store'
import Products from './components/Products'
import SingleProduct from './components/singleproduct'
import Checkout from './components/Checkout'
import OrderSubmitted from './components/OrderSubmitted'
import {submitCart, getCartFromLocalStorage} from './store/cart'
import {get} from 'http'
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
    if (!this.props.user.id) this.props.getCartFromLocalStorage()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        <Route exact path="/home" component={UserHome} />
        <Route exact path="/" component={Products} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/cart" component={CartView} />
        <Route exact path="/cart/checkout" component={Checkout} />
        <Route
          exact
          path="/cart/checkout/thank-you"
          component={OrderSubmitted}
        />
        <Route path="/products/:id(\d+)" component={SingleProduct} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    submitCart: (cart, status, email, address = null, id) => {
      dispatch(submitCart(cart, status, email, address, id))
    },
    getCartFromLocalStorage() {
      dispatch(getCartFromLocalStorage())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
