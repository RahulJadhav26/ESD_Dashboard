import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'http://35.172.171.121:8888' //  Prod
    // baseURL: 'http://localhost:8888' // Test
  })
}
