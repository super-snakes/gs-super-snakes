import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleProductThunk} from '../store/productReducer'

class SingleProduct extends Component {
  constructor() {
    super()
    this.state = {}
  }
  componentDidMount() {
    this.props.getSingleProduct() //this.props.match.params.id
  }

  render() {
    let obj = this.props.country
    return (
      <div>
        <div>
          <img src={this.props.product.imageUrl} height={200} />
          <h2>{this.props.product.title}</h2>
          <h2>Genre: {this.props.product.genre}</h2>
          <h4>by {this.props.product.author}</h4>
          <h4 />
          <h4>{this.props.description}</h4>
        </div>
        <div>
          <h2>Price: {this.props.product.price}</h2>
          <h2>Quantity: {this.props.product.quantity}</h2>
          <h2 />
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  product: state.productReducer
})

const mapDispatchToProps = dispatch => ({
  getSingleProduct: id => dispatch(getSingleProductThunk(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
