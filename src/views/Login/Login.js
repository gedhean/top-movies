import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { Grid, Paper, Typography, Divider, Button } from '@material-ui/core'
import PropTypes from 'prop-types'

const styles = theme => ({
  root: {
    maxWidth: '560px',
    margin: '0px auto',
    height: '80vh',
    paddingTop: theme.spacing.unit * 2
  },
  paper: {
    minWidth: 330,
    height: 200,
    // padding: `0px ${theme.spacing.unit * 3}px`
  },
  paperHeader: {
    padding: `${theme.spacing.unit * 2}px 0px`,
    textAlign: 'center',
    backgroundColor: theme.palette.primary.main,
    color: '#FFF'
  },
  paperBody: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '68%'
  },
  loginBtn: {
    color: '#FFF',
    backgroundColor: '#000',
    '&:hover': {
      backgroundColor: '#333'
    }
  }
})

const Login = props => {
  const { classes, onGitHubClick } = props
  return (
    <Grid container alignItems="center" justify="center" className={classes.root}>
      <Grid item>
        <Paper className={classes.paper}>
          <div className={classes.paperHeader}>
            <Typography component="h1" variant="headline" color="inherit">
              Login
            </Typography>
          </div>
          <Divider />
          <div className={classes.paperBody}>
            <Button
              onClick={onGitHubClick}
              className={classes.loginBtn}
              variant="contained"
              color="primary"
            >
              Login with GitHub
            </Button>
          </div>
        </Paper>
      </Grid>
    </Grid>
  )
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  onGitHubClick: PropTypes.func.isRequired
}

export default withStyles(styles)(Login)
