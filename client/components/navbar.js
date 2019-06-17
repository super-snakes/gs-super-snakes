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

// import {stat} from 'fs'

const StyledBadge = withStyles(theme => ({
  badge: {
    top: '50%',
    right: -3,
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
    <div style={{backgroundColor: '#2F4F4F'}}>
      <Link to="/">
        <span>
          <h1
            style={{
              fontFamily: 'Comic Sans MS',
              fontSize: '36px',
              margin: '20px',
              marginTop: '10px',
              color: 'white'
            }}
          >
            Super Snakes Bookstore
          </h1>
          <img
            src="https://png.pngtree.com/element_origin_min_pic/17/08/15/3cfdfa77493149f83c91de3e69e1dcaf.jpg"
            style={{
              width: '100px',
              height: '125px',
              position: 'absolute',
              right: '25px',
              border: '3px solid #73AD21',
              padding: '10px'
            }}
          />
        </span>
      </Link>
      <nav>
        {props.user.id ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link
              to="/home"
              style={{
                color: 'white'
              }}
            >
              Home
            </Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            <Link
              to="/login"
              style={{
                color: 'white'
              }}
            >
              Login
            </Link>

            <Link
              to="/signup"
              style={{
                color: 'white'
              }}
            >
              Sign Up
            </Link>
          </div>
        )}
        <span>
          <Link to="/cart">
            <IconButton
              aria-label="Cart"
              style={{
                display: 'inline'
              }}
            >
              <StyledBadge badgeContent={cartSize} color="primary">
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>
          </Link>
          <OauthLoginForm
            style={{
              display: 'inline',
              padding: '10px'
            }}
          />
        </span>
      </nav>
      <hr />
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
