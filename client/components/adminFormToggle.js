import React, {Component} from 'react'
import {connect} from 'react-redux'
import NewBookForm from './NewBookForm'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import {addProductThunk} from '../store/products'

const useStyles = {
  button: {
    margin: 1
  },
  rightIcon: {
    marginLeft: 1
  }
}

class AdminFormToggle extends Component {
  constructor() {
    super()
    this.state = {
      showAddProductForm: false
    }
    this.toggle = this.toggle.bind(this)
    this.addProductAction = this.addProductAction.bind(this)
  }
  addProductAction(newProduct) {
    this.props.addProductAction(newProduct)
  }
  toggle(event) {
    event.preventDefault()
    this.setState(prevState => ({
      showAddProductForm: !prevState.showAddProductForm
    }))
  }

  render() {
    const classes = useStyles
    return (
      <div>
        <Fab
          size="small"
          color="secondary"
          aria-label="Add"
          className={classes.margin}
          onClick={this.toggle}
        >
          <AddIcon />
        </Fab>
        {this.state.showAddProductForm ? (
          <NewBookForm addProductAction={this.addProductAction} />
        ) : null}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addProductAction: newProduct => dispatch(addProductThunk(newProduct))
})
export default connect(null, mapDispatchToProps)(AdminFormToggle)
