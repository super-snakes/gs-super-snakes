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
const defaultCart = {}

/**
 * ACTION CREATORS
 */
const addToCartAction = (item, quantity) => {
  return {type: ADD_TO_CART, item, quantity}
}

const getCartAction = items => {
  return {type: GET_CART, items}
}

const removeFromCartAction = (id, amountToDelete) => {
  return {type: REMOVE_FROM_CART, id, amountToDelete}
}
/**
 * THUNK CREATORS
 */
export const addToCart = (itemId, quantity) => {
  return async dispatch => {
    const {data} = await axios.get(`/api/products/${itemId}`)
    dispatch(addToCartAction(data, quantity))
  }
}

export const getCart = userId => {
  return async dispatch => {
    const {data} = await axios.get(`/api/orders/cart/${userId}`)
    dispatch(getCartAction(data))
  }
}

export const removeFromCart = (id, amountToDelete) => {
  return dispatch => {
    dispatch(removeFromCartAction(id, amountToDelete))
  }
}

export const submitCart = (cart, status, userId) => {
  return async dispatch => {
    const {data} = await axios.post('/api/orders/cart', {cart, status, userId})
    dispatch(getCartAction({}))
  }
}
/**
 * REDUCER
 */
export default function(state = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      return {...action.items}
    case ADD_TO_CART: {
      let newState = {...state}
      const item = action.item
      if (newState[item.id]) {
        newState[item.id].quantity =
          newState[item.id].quantity + action.quantity
      } else {
        newState[item.id] = {quantity: action.quantity, book: item}
      }
      return newState
    }

    // if (action.quantity) {
    //   let newState = [...state]

    //   for (let i = 0; i < action.quantity; i++) {
    //     newState.push(action.item)
    //   }
    //   return newState
    // } else {
    //   return [...state, action.item]
    // }
    case REMOVE_FROM_CART: {
      let newState = {...state}
      const id = action.id
      if (newState[id].quantity > 1) {
        newState[id].quantity = newState[id].quantity - action.amountToDelete
        if (newState[id].quantity < 1) {
          delete newState[id]
        }
      } else {
        delete newState[id]
      }
      return newState
    }
    default:
      return state
  }
}
