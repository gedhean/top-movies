import Axios from 'axios'

const API_KEY = process.env.REACT_APP_API_KEY
Axios.defaults.baseURL = process.env.REACT_APP_API_URL

export async function getMovies(resource, page) {
  const res = await Axios.get(`/${resource}?api_key=${API_KEY}&page=${page}`)
  return await res.data
}

export async function searchMulti({ query, page = 1 }) {
  const res = await Axios.get(
    `search/multi?api_key=${API_KEY}&query=${query}&page=${page}`
  )
  return await res.data
}

export default async resource => {
  const res = await Axios.get(`/${resource}?api_key=${API_KEY}`)
  return await res.data
}
