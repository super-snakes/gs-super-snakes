import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../store'
import {Redirect} from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {user, handleClick} = props

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
        <button className="btn bg-red white p1 rounded" onClick={handleClick}>
          Logout
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const history = ownProps.history
  return {
    handleClick() {
      dispatch(logout()).then(() => history.push('/'))
    }
  }
}

/**
 * CONTAINER
 */
// const mapState = state => {
//   return {
//     email: state.user.email
//   }
// }

export default connect(mapStateToProps, mapDispatchToProps)(UserHome)

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
