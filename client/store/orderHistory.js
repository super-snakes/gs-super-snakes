import axios from 'axios'

const initialState = []

const GOT_ORDERS = 'GOT_ORDERS'

const gotOrders = orders => ({type: GOT_ORDERS, orders})

export const getOrders = id => {
  return async dispatch => {
    const {data} = await axios.get(`/api/orders/cart/orderHistory/${id}`)
    dispatch(gotOrders(data))
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ORDERS: {
      return [...action.orders]
    }
    default: {
      return state
    }
  }
}
