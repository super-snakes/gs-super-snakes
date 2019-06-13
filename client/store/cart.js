import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
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

const removeFromCartAction = itemIndex => {
  return {type: REMOVE_FROM_CART, itemIndex}
}
/**
 * THUNK CREATORS
 */
export const getCart = userId => {
  return async dispatch => {
    const {data} = await axios.get(`/api/orders/cart/${userId}`)
    dispatch(getCartAction(data))
  }
}

export const addtoCart = itemId => {
  return async dispatch => {
    const {data} = await axios.get(`/api/products/${itemId}`)
    dispatch(addToCartAction(data))
  }
}

export const removeFromCart = itemIndex => {
  return dispatch => {
    dispatch(removeFromCartAction(itemIndex))
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
      return [...state, action.item]
    case REMOVE_FROM_CART:
      const removedItemArray = [
        ...state.slice(0, action.itemIndex),
        ...state.slice(action.itemIndex + 1)
      ]

      return removedItemArray
    default:
      return state
  }
}
