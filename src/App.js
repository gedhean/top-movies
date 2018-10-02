import React, { Component } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/configuredStore'
import DefaultLayout from './views/DefaultLayout'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Provider store={store}>
          <Router>
            <Switch>
              <Route path="/" name="Home" component={DefaultLayout} />
            </Switch>
          </Router>
        </Provider>
      </React.Fragment>
    )
  }
}
console.log(process.env)
export default App
