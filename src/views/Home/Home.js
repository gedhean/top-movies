import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Grid } from '@material-ui/core'

import apiFetch from '../../api/fetch.js'
import MovieList from '../../components/GridList.js';

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

    return (
      <div className={classes.root}>
        <AppBar position="fixed" color="primary" className={classes.header}>
          <Toolbar>
            <Typography variant="title" color="inherit">
              Top Movies
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          <div className={classes.container}>
            <Grid container spacing={24}>
              <Grid item>
                <MovieList movies={this.state.movies.results}/>
                {/* <div>
                  {Object.keys(this.state.movies).length
                    ? this.state.movies.results.map((movie, idx) => (
                        <div key={idx}>
                          <div>{movie.original_title}</div>
                          <img
                            src={`${config.api.base_url}/${config.api.poster_size}/${
                              movie.poster_path
                            }`}
                            alt="Film poster"
                          />
                          <img
                            src={`${config.api.base_url}/${config.api.backdrop_size}/${
                              movie.backdrop_path
                            }`}
                            alt="Film poster"
                          />
                        </div>
                      ))
                    : null}
                </div> */}
              </Grid>
            </Grid>
          </div>
        </main>
      </div>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Home)
