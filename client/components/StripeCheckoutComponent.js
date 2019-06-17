import React from 'react'
import ReactDOM from 'react-dom'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import {toast} from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'

toast.configure()

const StripeCheckoutComponent = props => {
  async function handleToken(token, addresses) {
    const response = await axios.post(
      'https://ry7v05l6on.sse.codesandbox.io/checkout',
      {token, product}
    )
    const {status} = response.data
    console.log('Response:', response.data)
    if (status === 'success') {
      toast('Success! Check email for details', {type: 'success'})
    } else {
      toast('Something went wrong', {type: 'error'})
    }
  }

  return (
    <div>
      <StripeCheckout
        stripeKey="pk_test_BKWHI4Geig0RczDY3D2kmap500TcRujiqs"
        token={handleToken}
        amount={3.0 * 100}
        name="Tesla Roadster"
        billingAddress
        shippingAddress
      />
    </div>
  )
}

export default StripeCheckoutComponent
