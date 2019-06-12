import axios from 'axios'

const GOT_SINGLE_PRODUCT = 'GOT_SINGLE_PRODUCT'
// const UPDATE_PRODUCT= 'UPDATE_PRODUCT'

const getSingleProduct = product => ({
  type: GOT_SINGLE_PRODUCT,
  product
})

// const updateProduct = (product)=>({
//    type: UPDATE_PRODUCT,
//    products
// })

export const getSingleProductThunk = () => async dispatch => {
  const {data} = await axios.get(`/api/seemycomp/`)
  dispatch(getSingleProduct(data))
}

// export const updateAircraftThunk=(aircraft, id)=>async (dispatch)=>{
//    const {data}=await axios.put(`/api/aircrafts/${id}`, aircraft)
//    dispatch(updateAircraft(data.aircrafts))

// }

export const productReducer = (state = [], action) => {
  switch (action.type) {
    case GOT_SINGLE_PRODUCT:
      return action.product
    // case UPDATE_PRODUCT:
    //     return Object.assign({}, {country: state.product}, action.product)
    default:
      return state
  }
}
