import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../store'
import {Redirect} from 'react-router-dom'
import {submitCart, getCart} from '../store/cart'

/**
 * COMPONENT
 */

class UserHome extends React.Component {
  componentDidMount() {
    if (this.props.user) {
      this.props.setCart(
        this.props.cart,
        'pending',
        this.props.user.email,
        null,
        this.props.user.id
      )
      console.log('THIS WAS DISPATCHED')
    }
  }

  render() {
    const {user, handleClick} = this.props

    if (!user.id) {
      return <Redirect to="/" />
    }

    return (
      <div className="h100 w100 flex column align-items-center justify-center">
        <div className="flex">
          <img src={user.imageUrl} className="rounded mr1" />
          <h1>Welcome {user.email}!</h1>
        </div>
        <div>
          <button
            className="btn bg-red white p1 rounded"
            onClick={() =>
              handleClick(this.props.cart, 'pending', user.email, null, user.id)
            }
          >
            Logout
          </button>
        </div>
      </div>
    )
  }
}

// export const UserHome = props => {
//   const {user, handleClick} = props

//   if (user.id) {
//     props.setCart(user.id)
//   }

//   if (!user.id) {
//     return <Redirect to="/" />
//   }

//   return (
//     <div className="h100 w100 flex column align-items-center justify-center">
//       <div className="flex">
//         <img src={user.imageUrl} className="rounded mr1" />
//         <h1>Welcome {user.email}!</h1>
//       </div>
//       <div>
//         <button
//           className="btn bg-red white p1 rounded"
//           onClick={() =>
//             handleClick(props.cart, 'pending', user.email, null, user.id)
//           }
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   )
// }

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    cart: state.cart
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const history = ownProps.history
  return {
    handleClick(cart, status, email, address, id) {
      dispatch(logout()).then(() => history.push('/'))
      if (Object.values(cart).length) {
        dispatch(submitCart(cart, status, email, address, id))
      }
    },
    setCart(id) {
      dispatch(submitCart(cart, status, email, address, id))
      dispatch(getCart(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHome)
