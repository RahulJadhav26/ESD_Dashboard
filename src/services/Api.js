import axios from 'axios'

export default () => {
  return axios.create({
    // baseURL: 'http://35.172.171.121:8888' //  cloud Prod
    // baseURL: 'http://localhost:8888' // Test
    baseURL: 'http://128.230.247.39:8888' // CENT Server

  })
}
