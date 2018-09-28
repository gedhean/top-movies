import Axios from 'axios'

const API_KEY = process.env.REACT_APP_API_KEY
Axios.defaults.baseURL = process.env.REACT_APP_API_URL

export default async (resource) => {
  const res = await Axios.get(`/${resource}?api_key=${API_KEY}`)
  return await res.data
}
