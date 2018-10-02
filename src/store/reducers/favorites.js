// Favorites actions
export const setFavorites = favorites => ({ type: 'SET_FAVORITES', paylaod: favorites })
export const addFavorite = favorite => ({ type: 'ADD_FAVORITE', paylaod: favorite })
export const removeFavorite = favoriteId => ({ type: 'REMOVE_FAVORIE', paylaod: favoriteId })
// Favorites reducer
const INIT_STATE = { favorites: [], favIds: [] }
const favorites = (state = INIT_STATE, { type, paylaod }) => {
  switch (type) {
    case 'SET_FAVORITES':
      return { ...state, favorites: paylaod, favIds: paylaod.map(movie => movie.id) }
    case 'ADD_FAVORITE':
      const newFavorites = [...state.favorites, paylaod]
      return { ...state, favorites: newFavorites, favIds: [...state.favIds, paylaod.id] }
    case 'REMOVE_FAVORIE':
      return {
        ...state,
        favorites: state.favorites.filter(movie => movie.id !== paylaod),
        favIds: state.favIds.filter(movie => movie.id !== paylaod)
      }
    default:
      return state
  }
}

export default favorites
