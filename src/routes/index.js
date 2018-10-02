import React from 'react'
import Loadable from 'react-loadable'
import LinearProgress from '@material-ui/core/LinearProgress'

import Details from '../views/Details'
import DefaultLayout from '../views/DefaultLayout'
import SearchConainer from '../containers/SearchConainer'
import LoginContainer from '../containers/LoginContainer'
import FavoritesContainer from '../containers/FavoritesContainer'

const Loading = () => <LinearProgress color="secondary" />

const Home = Loadable({
  loader: () => import('../views/Home'),
  loading: Loading
})

export default [
  {
    path: '/',
    exact: true,
    name: 'Home',
    component: DefaultLayout
  },
  {
    path: '/home',
    exact: false,
    name: 'Top Movies',
    component: Home
  },
  {
    path: '/details/:id',
    exact: false,
    name: 'Movie Details',
    component: Details
  },
  {
    path: '/search/:query',
    exact: false,
    name: 'Search',
    component: SearchConainer
  },
  {
    path: '/favorites',
    exact: false,
    name: 'Favorites',
    component: FavoritesContainer
  },
  {
    path: '/login',
    exact: false,
    name: 'Login',
    component: LoginContainer
  }
]
