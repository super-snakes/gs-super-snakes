import axios from 'axios'

const GOT_PRODUCTS = 'GOT_PRODUCTS'

const defaultProducts = {products: []}

const gotProducts = products => ({type: GOT_PRODUCTS, products})

export const getProducts = () => {
  return async dispatch => {
    try {
      const res = await axios('/api/products')
      dispatch(gotProducts(res.data))
    } catch (error) {
      console.log(error)
    }
  }
}

export default function(state = defaultProducts, action) {
  switch (action.type) {
    case GOT_PRODUCTS: {
      return action.products
    }
    default: {
      return state
    }
  }
}
