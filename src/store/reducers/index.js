import { combineReducers } from 'redux'
import favorites from './favorites.js'
import auth from './auth.js'

export default combineReducers({
  auth,
  favorites
})
