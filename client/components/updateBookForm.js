import React, {Component} from 'react' //to use jsx
import ReactDOM from 'react-dom'

const updateState = {
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
class UpdateBookForm extends React.Component {
  constructor() {
    super()
    this.state = updateState
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleSubmit(event) {
    event.preventDefault()
    let updatedProduct = {
      title: this.state.title,
      author: this.state.author,
      imageUrl: this.state.imageUrl,
      description: this.state.description,
      tags: this.state.tags,
      quantity: this.state.quantity,
      genre: this.state.genre,
      featuredItem: this.state.featuredItem,
      salePercentageOff: this.state.salePercentageOff,
      price: this.state.price
    }
    this.props.updateProductAction(updatedProduct)
    this.setState(updateState)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render() {
    return (
      <div>
        <h3>UPDATE PRODUCT</h3>
        <hr />
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title">title:</label>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />

          <label htmlFor="author">author:</label>
          <input
            type="text"
            name="author"
            value={this.state.author}
            onChange={this.handleChange}
          />

          <label htmlFor="imageUrl">imageUrl:</label>
          <input
            type="text"
            name="imageUrl"
            value={this.state.imageUrl}
            onChange={this.handleChange}
          />

          <label htmlFor="description">description:</label>
          <input
            type="text"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
          />

          <label htmlFor="tags">tags:</label>
          <input
            type="text"
            name="tags"
            value={this.state.tags}
            onChange={this.handleChange}
          />

          <label htmlFor="quantity">quantity:</label>
          <input
            type="text"
            name="quantity"
            value={this.state.quantity}
            onChange={this.handleChange}
          />

          <label htmlFor="genre">genre:</label>
          <input
            type="text"
            name="genre"
            value={this.state.genre}
            onChange={this.handleChange}
          />

          <label htmlFor="featuredItem">featuredItem:</label>
          <input
            type="text"
            name="featuredItem"
            value={this.state.featuredItem}
            onChange={this.handleChange}
          />

          <label htmlFor="salePercentageOff">salePercentageOff:</label>
          <input
            type="text"
            name="salePercentageOff"
            value={this.state.salePercentageOff}
            onChange={this.handleChange}
          />

          <label htmlFor="price">price:</label>
          <input
            type="text"
            name="price"
            value={this.state.price}
            onChange={this.handleChange}
          />

          <hr />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default UpdateBookForm
