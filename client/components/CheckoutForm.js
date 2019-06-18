import React from 'react'
import {connect} from 'react-redux'
import {submitCart} from '../store/cart'

//TO:
// Material UI form validators

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      card: '',
      street: '',
      apt: '',
      city: '',
      state: '',
      zipCode: '',
      email: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    let user = this.props.user
    this.setState({
      name: user.name || '',
      card: user.paymentInformation || '',
      street: user.street || '',
      apt: user.apt || '',
      city: user.city || '',
      state: user.state || '',
      zipCode: user.zipCode || '',
      email: user.email || ''
    })
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    const id = this.props.user.id
    const status = 'shipped'
    const address = {
      street: this.state.street,
      apt: this.state.apt || null,
      city: this.state.city,
      state: this.state.state,
      zipCode: this.state.zipCode
    }

    this.props.submitCart(
      this.props.cart,
      status,
      this.state.email,
      address,
      id
    )
    this.props.history.push(`${this.props.location.pathname}/thank-you`)
  }

  render() {
    return (
      <div id="formWrapper">
        <form onSubmit={this.handleSubmit} id="checkoutForm">
          <label htmlFor="name">Name:</label>
          <input
            onChange={this.handleChange}
            name="name"
            type="text"
            value={this.state.name}
            placeholder="Enter"
            required
          />

          <label htmlFor="card">Card number:</label>
          <input
            onChange={this.handleChange}
            name="card"
            type="text"
            value={this.state.card}
            placeholder="Enter name"
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            onChange={this.handleChange}
            name="email"
            type="email"
            value={this.state.email}
            placeholder="Enter email"
            required
          />

          <label htmlFor="street">Street:</label>
          <input
            onChange={this.handleChange}
            name="street"
            type="text"
            value={this.state.street}
            placeholder="Enter street"
          />

          <label htmlFor="apt">Apt/Unit:</label>
          <input
            onChange={this.handleChange}
            name="apt"
            type="text"
            value={this.state.apt}
            placeholder="Enter apartment/unit number"
          />

          <label htmlFor="city">City:</label>
          <input
            onChange={this.handleChange}
            name="city"
            type="text"
            value={this.state.city}
            placeholder="Enter city"
          />

          <label htmlFor="state">State:</label>
          <input
            onChange={this.handleChange}
            name="state"
            type="text"
            value={this.state.state}
            placeholder="Enter state"
          />

          <label htmlFor="zipCode">Zip Code:</label>
          <input
            onChange={this.handleChange}
            name="zipCode"
            type="text"
            value={this.state.zipCode}
            placeholder="Enter zipcode"
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

const mapToState = state => ({
  cart: state.cart,
  user: state.user
})

const mapToDispatch = dispatch => ({
  submitCart: (cart, status, email, address, id) =>
    dispatch(submitCart(cart, status, email, address, id))
})

export default connect(mapToState, mapToDispatch)(CheckoutForm)
