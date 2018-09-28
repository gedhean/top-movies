import React from 'react';
import Loadable from 'react-loadable'

const Loading = () => <div>Loading...</div>

const DefaulLayout = Loadable({
  loader: () => import('../views/Layout'),
  loading: Loading
})

const Home = Loadable({
  loader: () => import('../views/Home'),
  loading: Loading
})

export default [
  {
    path: '/',
    exact: true,
    name: 'Home',
    component: DefaulLayout
  },
  {
    path: '/home',
    exact: false,
    name: 'Top Movies',
    component: Home
  }
]
