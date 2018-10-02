import React from 'react'
import Loadable from 'react-loadable'
import DefaultLayout from '../views/DefaultLayout'
import Details from '../views/Details'
import { LinearProgress } from '@material-ui/core'
import SearchConainer from '../containers/SearchConainer';
import FavoritesContainer from '../containers/FavoritesContainer';
import LoginContainer from '../containers/LoginContainer';

const Loading = () => <LinearProgress color="secondary"/>
// Loadable ta quenbrando na rota `/`
// const DefaultLayout = Loadable({
//   loader: () => import('../views/Layout.js'),
//   loading: Loading
// })

const Home = Loadable({
  loader: () => import('../views/Home'),
  loading: Loading
})

// const Details = Loadable({
//   loader: () => import('../views/Details'),
//   loading: Loading
// })

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
