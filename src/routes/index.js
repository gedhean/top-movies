import React from 'react';
import Loadable from 'react-loadable'
import DefaultLayout from '../views/Layout';

const Loading = () => <div>Loading...</div>
// Loadable ta quenbrando na rota `/`
// const DefaultLayout = Loadable({
//   loader: () => import('../views/Layout.js'),
//   loading: Loading
// })

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
  }
]
