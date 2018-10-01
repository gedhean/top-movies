import { createStore, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'
import rootReducer from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(rootReducer, composeEnhancers(applyMiddleware(logger)))
