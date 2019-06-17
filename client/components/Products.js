import React from 'react'
import {connect} from 'react-redux'
import ProductCard from './ProductCard'
import {getProducts} from '../store/products'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import ListSubheader from '@material-ui/core/ListSubheader'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'
import red from '@material-ui/core/colors/red'
import AdminFormToggle from './adminFormToggle'

const useStyles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden'
  },
  gridList: {
    width: 500,
    height: 450
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  }
}

class Products extends React.Component {
  componentDidMount() {
    this.props.getBooks()
  }

  render() {
    const books = this.props.products
    return (
      <div id="allProductsWrapper">
        {this.props.user.isAdmin ? <AdminFormToggle /> : false}
        <GridList cellHeight={180} style={{padding: '25px'}}>
          {/* <GridListTile key="Subheader" cols={2} style={{height: 'auto'}} /> */}
          {books.map(book => {
            return <ProductCard key={book.id} book={book} />
          })}
        </GridList>
      </div>
    )
  }
}

const mapToDispatch = dispatch => ({
  getBooks: () => dispatch(getProducts())
})

const mapStateToProps = state => ({
  products: state.products,
  user: state.user
})

export default connect(mapStateToProps, mapToDispatch)(Products)
