import { combineReducers } from 'redux'
import favorites from './favorites.js'
import feedback from './feedback.js'
import auth from './auth.js'

const appReducer = combineReducers({
  auth,
  feedback,
  favorites
})

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer