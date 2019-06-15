import axios from 'axios'
import {runInNewContext} from 'vm'

const GOT_PRODUCTS = 'GOT_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'

const DELETE_PRODUCT = 'DELETE_PRODUCT'

const defaultProducts = []

const gotProducts = products => ({type: GOT_PRODUCTS, products})
const addProductAction = product => ({type: ADD_PRODUCT, product})
const deleteProductAction = product => ({type: DELETE_PRODUCT, product})

export const getProducts = () => {
  return async dispatch => {
    try {
      const res = await axios.get('/api/products')
      dispatch(gotProducts(res.data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteProductThunk = id => {
  return async dispatch => {
    try {
      await axios.delete(`/api/products/${id}`)
      dispatch(deleteProductAction(id))
    } catch (error) {
      console.log(error)
    }
  }
}

export const addProductThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/products', product)
      dispatch(addProductAction(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export default function(state = defaultProducts, action) {
  switch (action.type) {
    case GOT_PRODUCTS: {
      console.log('products', action)
      return action.products
    }

    case ADD_PRODUCT: {
      return [...state, action.product]
    }
    default: {
      return state
    }
  }
}
