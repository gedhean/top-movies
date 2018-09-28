import React, { Component } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import routes from './routes'
import NotFount from './components/NotFound';
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Router>
          <Switch>
            {routes.map((route, idx) => (
              <Route key={idx} {...route} />
            ))}
            <Route key="Not Found" component={NotFount} />
          </Switch>
        </Router>
      </React.Fragment>
    )
  }
}
console.log(process.env);
export default App
