import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const ADD_TO_CART = 'ADD_TO_CART'
/**
 * INITIAL STATE
 */
const defaultCart = {}

/**
 * ACTION CREATORS
 */
const addToCart = item => {
  return {type: ADD_TO_CART, item}
}
/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function(state = defaultCart, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {...state, item}
    default:
      return state
  }
}
