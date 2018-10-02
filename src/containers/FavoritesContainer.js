import React, { Component } from 'react'
import { connect } from 'react-redux'
import LinearProgress from '@material-ui/core/LinearProgress'

import firebase from '../firebase/init'
import Favorites from '../views/Favorites'
import { newFeedback } from '../store/reducers/feedback'
import { setFavorites } from '../store/reducers/favorites'
import ResourceNotFound from '../components/ResourceNotFound'

class FavoritesContainer extends Component {
  state = {
    favorites: [], // Type Movie
    loading: true, // It's fetching favorites
    noContent: false // The current user do not have favorites
  }
  componentDidMount() {
    // Read favorites for the logged user
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .database()
          .ref('favorites/' + user.uid)
          .on('value', snapshot => {
            if (snapshot.exists()) {
              console.log(`Favorites to user ${user.uid}:`, snapshot.val())
              // Array de filmes favoritos
              const favoritesArr = Object.values(snapshot.val())
              this.props.dispatch(setFavorites(favoritesArr))
              this.setState({
                favorites: favoritesArr,
                loading: false
              })
            } else {
              this.setState({ loading: false, noContent: true })
              console.log(`O usuário ${user.uid} não possue favoritos.`)
            }
          })
      } else {
        this.setState({ loading: false, noContent: true })
        this.props.dispatch(
          newFeedback({
            variant: 'warning',
            message: 'Your are not logged. Please login to see favorites'
          })
        )
      }
    })
  }

  componentWillMount() {
    // Remove event listener when this component unmout
    firebase
      .database()
      .ref('favorites/' + this.props.userId)
      .off('value')
  }
  // TODO: implement favorites pagination
  laodMoreFavorites = page => {
    console.log('Page Fav:', page)
  }

  render() {
    const { authenticated } = this.props
    const { favorites, loading, noContent } = this.state
    console.table(this.state)
    if (loading) return <LinearProgress color="secondary" />

    if (noContent || !authenticated)
      return (
        <ResourceNotFound
          info={authenticated ? 'You do not have favorites' : 'Nothing to see here'}
        />
      )

    return <Favorites movies={favorites} loadMore={this.laodMoreFavorites} hasMore={false} />
  }
}

function mapStateToProps(state) {
  return {
    userId: state.auth.userData.uid,
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps)(FavoritesContainer)
