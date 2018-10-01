import React, { Component } from 'react'
import firebase from '../firebase/init'

class Favorites extends Component {
  state = {
    favorites: [], // Type Movie
    loading: true // It's fetching favorites
  }
  componentDidMount() {
    const userId = 123
    // Lê os favoritos do usuário 123
    firebase
      .database()
      .ref('favorites/' + userId)
      .on('value', snapshot => {
        if (snapshot.exists()) {
          console.log(`Favorites to user ${userId}:`, snapshot.val())
          // Array de filmes favoritos
          const favoritesArr = Object.values(snapshot.val())
          this.setState({
            favorites: favoritesArr,
            loading: false
          })
        } else {
          this.setState({ loading: false })
          console.log(`O usuário ${userId} não possue favoritos.`)
        }
      })
  }
  render() {
    return <div>Favorites </div>
  }
}

export default Favorites
