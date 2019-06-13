import React from 'react'
import {connect} from 'react-redux'
import {submitCart} from '../store/cart'

//TODO
// handle submit
// validators

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      card: '',
      address: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    let user = this.props.user
    this.setState({
      name: user.name || 'Name',
      card: user.paymentInformation || 'Card number',
      address: user.address || 'Address'
    })
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    const id = this.props.user.id
    const status = 'shipped'
    // let items = [];
    // this.props.cart.forEach(el => {
    //     items.push(el.id)
    // });

    this.props.submitCart(this.props.cart, status, id)
  }

  render() {
    // const creditCard = /^((4\d{3})|(5[1-5]\d{2})|(6011))-?\d{4}-?\d{4}-?\d{4}|3[4,7]\d{13}$/
    return (
      <div id="formWrapper">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            onChange={this.handleChange}
            name="name"
            type="text"
            value={this.state.name}
            required
          />

          <label htmlFor="card">Card number:</label>
          <input
            onChange={this.handleChange}
            name="card"
            type="text"
            value={this.state.card}
            required
          />

          <label htmlFor="address">Address:</label>
          <input
            onChange={this.handleChange}
            name="address"
            type="text"
            value={this.state.address}
            required
          />
          {/* <input onChange={this.handleChange} name="street1" type="text" />
                    <input onChange={this.handleChange} name="street2" type="text" />
                    <input onChange={this.handleChange} name="city" type="text" />
                    <input onChange={this.handleChange} name="state" type="text" />
                    <input onChange={this.handleChange} name="zipCode" type="text" /> */}
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

/* On submit
    - state cart --> db with 'status that is not pending'
    - clear the state cart
    - reroute somewhere or "ORDER IS ON THE WAYY"  
*/
const mapToState = state => ({
  cart: state.cart,
  user: state.user
})

const mapToDispatch = dispatch => ({
  submitCart: (cart, status, id) => dispatch(submitCart(cart, status, id))
})

export default connect(mapToState, mapToDispatch)(CheckoutForm)

{
  /* <input onChange={this.handleChange} name="street1" type="text" />
<input onChange={this.handleChange} name="street2" type="text" />
<input onChange={this.handleChange} name="city" type="text" />
<input onChange={this.handleChange} name="state" type="text" />
<input onChange={this.handleChange} name="zipCode" type="text" />  */
}
