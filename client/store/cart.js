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
const addToCartAction = item => {
  return {type: ADD_TO_CART, item}
}
/**
 * THUNK CREATORS
 */
export const addtoCart = itemId => {
  return async dispath => {
    const {data} = axios.get(`/api/prodcts/${itemId}`)
    dispath(addToCartAction(data))
  }
}
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
