import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

import apiFetch from '../../api/fetch.js'
import MovieList from '../../components/MovieList.js'

const styles = {
  root: {
    flexGrow: 1
  },
  container: {
    margin: '0px auto',
    paddingTop: '60px',
    width: '720px'
  },
  header: {
    height: '60px'
  }
}

class Home extends Component {
  state = {
    movies: {}
  }

  componentDidMount() {
    apiFetch('trending/all/day').then(data => {
      console.log(data)
      this.setState({ movies: data })
    })
    apiFetch('configuration').then(data => {
      console.log(data)
      this.setState({ config: data })
    })
  }
  render() {
    const { classes } = this.props
    const { movies } = this.state

    return (
      <div className={classes.container}>
        <Grid container spacing={24}>
          <Grid item>
            <MovieList movies={movies.results} />
          </Grid>
        </Grid>
      </div>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Home)
