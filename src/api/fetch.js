import Axios from 'axios'

const API_KEY = process.env.REACT_APP_API_KEY
const API_BASE_URL = process.env.REACT_APP_API_URL
Axios.defaults.baseURL = API_BASE_URL

export async function getTopMovies(page) {
  const res = await Axios.get(`/movie/popular?api_key=${API_KEY}&page=${page}&region=brazil`)
  console.log('Request remaining limit:', res.headers['x-ratelimit-remaining'])
  return await res.data
}

export async function searchMulti({ query, page = 1 }) {
  const res = await Axios.get(`search/multi?api_key=${API_KEY}&query=${query}&page=${page}`)
  console.log('Request remaining limit:', res.headers['x-ratelimit-remaining'])
  return await res.data
}

export async function auth() {
  const res = await Axios(`authentication/token/new?api_key=${API_KEY}`)
  const { request_token } = res.data
  window.localStorage.setItem('token', request_token)
  console.log('Request Token:', request_token)

  window.location.href = `https://www.themoviedb.org/authenticate/${
    res.data.request_token
  }?api_key=${API_KEY}&redirect_to=http://localhost:3000/`
}

export async function newSession() {
  const res = await Axios.post(`authentication/session/new?api_key=${API_KEY}`, {
    request_token: window.localStorage.getItem('token')
  })
  console.log('Session:' , res.data);
  return await res.data
}

export default async resource => {
  const res = await Axios.get(`/${resource}?api_key=${API_KEY}`)
  console.log('Request remaining limit:', res.headers['x-ratelimit-remaining'])
  return await res.data
}
