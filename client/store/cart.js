import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const MODIFY_QUANITY = 'MODIFY_QUANITY'
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

const modifyCartAction = (id, changeAmount) => {
  return {type: MODIFY_QUANITY, id, changeAmount}
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

export const modifyCart = (id, changeAmount) => {
  return dispatch => {
    dispatch(modifyCartAction(id, changeAmount))
  }
}

export const submitCart = (cart, status, email, address, userId) => {
  return async dispatch => {
    const {data} = await axios.post('/api/orders/cart', {
      cart,
      status,
      email,
      address,
      userId
    })
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
      window.localStorage.setItem('localCart', JSON.stringify(newState))

      return newState
    }
    case MODIFY_QUANITY: {
      let newState = {...state}
      const id = action.id
      if (newState[id].quantity > 1) {
        newState[id].quantity = newState[id].quantity + action.changeAmount
        if (newState[id].quantity < 1) {
          delete newState[id]
        }
      } else {
        delete newState[id]
      }
      window.localStorage.setItem('localCart', JSON.stringify(newState))

      return newState
    }
    default:
      return state
  }
}
