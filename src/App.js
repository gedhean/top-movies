import React, { Component } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import DefaultLayout from './views/Layout';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Router>
          <Switch>
            <Route path="/" name="Home" component={DefaultLayout} />
          </Switch>
        </Router>
      </React.Fragment>
    )
  }
}
console.log(process.env);
export default App
