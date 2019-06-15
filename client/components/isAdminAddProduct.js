import React, {Component} from 'react' //to use jsx
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {addProductThunk} from '../store/products'

class NewBookForm extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      author: '',
      imageUrl: '',
      description: '',
      tags: '',
      quantity: '',
      genre: '',
      featuredItem: false,
      salePercentageOff: 0,
      price: 0
    }
    this.handleSumbit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async handleSubmit(event) {
    event.preventDefault()
    this.props.addProductAction(this.state)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title">
            Title:
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="author">
            Author:
            <input
              type="text"
              name="author"
              value={this.state.author}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="imageUrl">
            imageUrl:
            <input
              type="text"
              name="imageUrl"
              value={this.state.imageUrl}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="description">
            Description:
            <input
              type="text"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="tags">
            Tags:
            <input
              type="text"
              name="tags"
              value={this.state.tags}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="quantity">
            Quantity:
            <input
              type="text"
              name="quantity"
              value={this.state.quantity}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="genre">
            Genre:
            <input
              type="text"
              name="genre"
              value={this.state.genre}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="featuredItem">
            Featured Item:
            <input
              type="text"
              name="featuredItem"
              value={this.state.featuredItem}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="salePercentageOff">
            Sale:
            <input
              type="text"
              name="salePercentageOff"
              value={this.state.salePercentageOff}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="price">
            Price:
            <input
              type="text"
              name="price"
              value={this.state.price}
              onChange={this.handleChange}
            />
          </label>
        </form>
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => ({
  addProductAction: newProduct => dispatch(addProductThunk(newProduct))
})

export default connect(null, mapDispatchToProps)(NewBookForm)
