import axios from 'axios'

const GOT_SINGLE_BOOK = 'GOT_SINGLE_BOOK'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

export const gotSingleBook = book => ({
  type: GOT_SINGLE_BOOK,
  book
})

const updateProductAction = product => ({
  type: UPDATE_PRODUCT,
  product
})

export const getSingleBookThunk = id => async dispatch => {
  const {data} = await axios.get(`/api/products/${id}`)
  dispatch(gotSingleBook(data))
}

export const updateProductThunk = (product, id) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/products/${id}`, product)
      console.log('thunk data', data)
      dispatch(updateProductAction(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const productReducer = (state = [], action) => {
  switch (action.type) {
    case GOT_SINGLE_BOOK:
      return action.book
    case UPDATE_PRODUCT:
      console.log('STATE', state)
      console.log('ACTION', action)
      return Object.assign({}, {products: state}, action.product.products)
    default:
      return state
  }
}
