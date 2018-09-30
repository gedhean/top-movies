import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import { getMovies } from '../../api/fetch.js'
// import apiFetch from '../../api/fetch.js'
import MovieList from '../../components/MovieList.js'

const styles = {
  root: {
    flexGrow: 1
  },
  container: {
    margin: '0px auto',
    maxWidth: '565px'
  }
}

class Home extends Component {
  state = {
    movies: [],
    page: 1,
    hasMore: true
  }

  componentDidMount() {
    this.loadMoveis(1)
    // apiFetch('configuration').then(data => {
    //   console.log(data)
    //   this.setState({ config: data })
    // })
  }

  loadMoveis = page => {
    console.log('page:', page)
    getMovies('trending/all/day', page).then(data => {
      console.log(data)
      this.setState(prevState => ({
        movies: [...prevState.movies, ...data.results],
        page: data.page,
        totalPages: data.total_pages,
        hasMore: page < data.total_pages
      }))
    })
  }

  render() {
    const { classes } = this.props
    const { movies, hasMore } = this.state

    return (
      <div className={classes.container}>
        <MovieList movies={movies} loadMore={this.loadMoveis} hasMore={hasMore} />
      </div>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Home)
