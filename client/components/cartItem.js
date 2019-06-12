import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import DeleteIcon from '@material-ui/icons/Delete'
import {removeFromCart} from '../store/cart'
import {connect} from 'react-redux'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
}))

const CartItem = props => {
  const classes = useStyles()
  const {id, title, imageUrl, author, price} = props.product

  return (
    <div key={props.keyValue}>
      <Paper className={classes.root}>
        <h4>{title}</h4>
        <h5>{author}</h5>
        <p>{price}</p>
        <img src={imageUrl} />
        <DeleteIcon onClick={() => props.removeFromCart(props.keyValue)} />
      </Paper>
    </div>
  )
}

const mapDispatch = dispatch => {
  return {
    removeFromCart: productIndex => dispatch(removeFromCart(productIndex))
  }
}

export default connect(null, mapDispatch)(CartItem)