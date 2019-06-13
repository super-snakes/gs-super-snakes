import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import DeleteIcon from '@material-ui/icons/Delete'
import {modifyCart} from '../store/cart'
import {connect} from 'react-redux'
import {Add, Remove} from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
}))

const CartItem = props => {
  const classes = useStyles()
  const {id, title, imageUrl, author, price} = props.product

  return (
    <div>
      <Paper className={classes.root}>
        <h4>{title}</h4>
        <h5>{author}</h5>
        <p>${(price / 100).toFixed(2)}</p>
        <p>
          Quantity: <Remove onClick={() => props.modifyCart(id, -1)} />
          {props.quantity}
          <Add onClick={() => props.modifyCart(id, 1)} />
        </p>
        <img src={imageUrl} />
        <DeleteIcon onClick={() => props.modifyCart(id, -props.quantity)} />
      </Paper>
    </div>
  )
}

const mapDispatch = dispatch => {
  return {
    modifyCart: (productId, amountToDelete) =>
      dispatch(modifyCart(productId, amountToDelete))
  }
}

export default connect(null, mapDispatch)(CartItem)
