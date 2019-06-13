import axios from 'axios'

const GOT_SINGLE_BOOK = 'GOT_SINGLE_BOOK'

const gotSingleBook = book => ({
  type: GOT_SINGLE_BOOK,
  book
})

export const getSingleBookThunk = id => async dispatch => {
  console.log('------>', id)
  const {data} = await axios.get(`/api/products/${id}`)
  console.log('------>DATA', data)
  dispatch(gotSingleBook(data))
}

export const productReducer = (state = [], action) => {
  switch (action.type) {
    case GOT_SINGLE_BOOK:
      return action.book
    default:
      return state
  }
}
