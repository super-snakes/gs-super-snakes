import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import {withStyles} from '@material-ui/core/styles'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import OauthLoginForm from './oauth-login-form'
import Button from '@material-ui/core/Button'

const StyledBadge = withStyles(theme => ({
  badge: {
    // The border color match the background color.
    border: `2px solid ${
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[900]
    }`
  }
}))(Badge)

const Navbar = (props, {handleClick, isLoggedIn}) => {
  let cartSize = 0
  for (let key in props.cart) {
    if (props.cart[key]) {
      cartSize += props.cart[key].quantity
    }
  }
  return (
    <div id="nav-bar-wrapper">
      <Link to="/">
        <span id="home-link-wrapper">
          <h1 id="super-snake">Super Snakes Bookstore</h1>
          <img
            id="super-snake-logo"
            src="https://png.pngtree.com/element_origin_min_pic/17/08/15/3cfdfa77493149f83c91de3e69e1dcaf.jpg"
          />
        </span>
      </Link>
      <nav>
        {props.user.id ? (
          <div className="navbar-link-wrapper">
            {/* The navbar will show these links after you log in */}
            <Link className="nav-link" to="/home">
              Profile
            </Link>
            <Link to="/cart" id="cart-wrapper">
              <IconButton id="cartIcon" aria-label="Cart">
                <StyledBadge badgeContent={cartSize} color="primary">
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
            </Link>
          </div>
        ) : (
          <div className="navbar-link-wrapper">
            <Link className="nav-link" to="/login">
              Login
            </Link>

            <Link className="nav-link" to="/signup">
              Sign Up
            </Link>
            <Link to="/cart" id="cart-wrapper">
              <IconButton id="cartIcon">
                <StyledBadge badgeContent={cartSize} color="primary">
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
            </Link>
          </div>
        )}
      </nav>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    cart: state.cart,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
