import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { Switch, Route, Redirect, Link } from 'react-router-dom'

import ButtonBase from '@material-ui/core/ButtonBase'

// import NotFount from '../components/NotFound';
import routes from '../routes'

const styles = {
  root: {
    flexGrow: 1
  },
  header: {
    height: '60px'
  },
  main: {
    marginTop: '60px'
  }
}

class DefaultLayout extends Component {
  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <AppBar position="fixed" color="primary" className={classes.header}>
          <Toolbar>
            <ButtonBase component={Link} to="/">
              <Typography variant="title" color="inherit">
                Top Movies
              </Typography>
            </ButtonBase>
          </Toolbar>
        </AppBar>
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
