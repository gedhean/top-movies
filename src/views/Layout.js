import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Switch, Route, Redirect } from 'react-router-dom'

// import NotFount from '../components/NotFound';
import routes from '../routes'
import AppBar from '../components/AppBar.js';
const styles = {
  root: {
    flexGrow: 1
  },
  main: {
    marginTop: '48px'
  }
}

class DefaultLayout extends Component {
  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <AppBar />
        <main className={classes.main}>
          <Switch>
            {routes.map(
              (route, idx) =>
                route.component ? (
                  <Route
                    key={idx}
                    exact={route.exact}
                    path={route.path}
                    name={route.name}
                    component={route.component}
                  />
                ) : null
            )}
            <Redirect from="/" to="/home" />
            {/* <Route key="Not Found" component={NotFount} /> */}
          </Switch>
        </main>
      </div>
    )
  }
}

DefaultLayout.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(DefaultLayout)
