import React from 'react'
import {connect} from 'react-redux'
import {Navbar} from './components'
import Routes from './routes'
import {me} from '../client/store/user'

class App extends React.Component {
  componentDidMount() {
    this.props.getMe()
  }
  render() {
    return (
      <div id="app">
        <Navbar />
        <Routes />
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  getMe: () => dispatch(me())
})

export default connect(null, mapDispatch)(App)
