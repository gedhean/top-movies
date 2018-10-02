import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Login from '../views/Login'
import firebase from '../firebase/init'
import { login } from '../store/reducers/auth'

class LoginContainer extends Component {
  componentDidMount() {
    const { dispatch } = this.props

    firebase
      .auth()
      .getRedirectResult()
      .then(function(result) {
        // The signed-in user info.
        var user = result.user
        if (user) {
          const userData = {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL
          }
          dispatch(login(userData))
          console.log('User:', user)
        }
      })
      .catch(function(error) {
        var errorMessage = error.message
        console.log('Erro no redirect results:', errorMessage)
      })
    console.log('Hi from login Container')
  }
  // Login using GitHub provider
  // TODO: add others providers
  handleGitHubLogin = () => {
    const provider = new firebase.auth.GithubAuthProvider()
    firebase.auth().signInWithRedirect(provider)
  }

  render() {
    if (this.props.authenticated) {
      return <Redirect to="/home" />
    }
    return <Login onGitHubClick={this.handleGitHubLogin} />
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  }
}

LoginContainer.propTypes = {
  authenticated: PropTypes.bool.isRequired
}

export default connect(mapStateToProps)(LoginContainer)
