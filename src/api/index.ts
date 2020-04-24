import axios from 'axios'
import store from '@/store'

const config = {
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: { Accept: 'application/json' }
}

const call = axios.create(config)
call.interceptors.request.use(request => {
  store.dispatch('globalValues/setLoading', true)
  return request
})
call.interceptors.response.use(
  response => {
    store.dispatch('globalValues/setLoading', false)
    return response
  },
  error => {
    store.dispatch('globalValues/setLoading', false)
    return error
  }
)
export default call
