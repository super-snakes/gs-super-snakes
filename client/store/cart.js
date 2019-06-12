import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
/**
 * INITIAL STATE
 */
const defaultCart = []

/**
 * ACTION CREATORS
 */
const addToCartAction = item => {
  return {type: ADD_TO_CART, item}
}

const getCartAction = items => {
  return {type: GET_CART, items}
}
/**
 * THUNK CREATORS
 */
export const getCart = userId => {
  return async dispath => {
    const {data} = await axios.get(`/api/orders/cart/${userId}`)
    dispath(getCartAction(data))
  }
}

export const addtoCart = itemId => {
  return async dispath => {
    const {data} = await axios.get(`/api/prodcts/${itemId}`)

    dispath(addToCartAction(data))
  }
}
/**
 * REDUCER
 */
export default function(state = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      return [...action.items]
    case ADD_TO_CART:
      return [...state, item]
    default:
      return state
  }
}
