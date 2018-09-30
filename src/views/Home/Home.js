import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { getTopMovies } from '../../api/fetch.js'
// import apiFetch from '../../api/fetch.js'
import MovieList from '../../components/MovieList.js'
// import firebase from '../../firebase/init';
import { newSession } from '../../api/fetch'
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
    if (window.localStorage.getItem('token') && !window.localStorage.getItem('session_id')) {
      newSession()
        .then(data => {
          console.log(data)
          if (data.success) {
            window.localStorage.setItem('session_id', data.session_id)
          }
        })
        .catch(err => {
          this.setState({ shouldAuthorize: true })
          console.log(err)
        })
    }
    // apiFetch('configuration').then(data => {
    //   console.log(data)
    //   this.setState({ config: data })
    // })
    // Access user data
    // firebase
    //   .auth()
    //   .getRedirectResult()
    //   .then(function(result) {
    //     if (result.credential) {
    //       // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    //       var token = result.credential.accessToken
    //       // ...
    //     }
    //     // The signed-in user info.
    //     var user = result.user
    //     console.log('User:', user)
    //   })
    //   .catch(function(error) {
    //     // Handle Errors here.
    //     var errorCode = error.code
    //     var errorMessage = error.message
    //     // The email of the user's account used.
    //     var email = error.email
    //     // The firebase.auth.AuthCredential type that was used.
    //     var credential = error.credential
    //     // ...
    //   })
  }

  loadMoveis = page => {
    console.log('page:', page)
    getTopMovies(page).then(data => {
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
